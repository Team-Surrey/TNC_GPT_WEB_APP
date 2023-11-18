"use client";

import { useRef, useState, useEffect } from "react";
import { Stack, Button, TextField } from "@mui/material";
import { useGlobalState } from "@/state/globalState";
import { Message, History } from "@/types";
import useConversation from "@/hooks/useConversation";
import { v4 } from "uuid";
import ModeToggle from "./ModeToggle";

export default function Chat() {
  const inputRef = useRef<any>(null);
  const [conversation] = useConversation();
  const [messages, setMessages] = useState<Array<Message>>(
    conversation ? conversation.messages : []
  );
  const [loading, setLoading] = useState(false);
  const { state, setState } = useGlobalState();

  const handlePredict = async () => {
    const value = inputRef?.current?.value;
    if (!value) return;
    setMessages((prev) => [
      ...prev,
      { content: value, time: new Date(), user: "user" },
    ]);

    setLoading(true);
    inputRef.current.value = "";
    const res = await fetch(`/api/predict?text=${value}`);
    const resJson = await res.json();

    setMessages((prev) => [
      ...prev,
      { content: resJson, time: new Date(), user: "ai" },
    ]);
    setLoading(false);
  };

  useEffect(() => {
    if (messages.length == 0) return;
    if (!state.currentConversation) {
      addHistoryItem();
    } else {
      updateHistory();
    }
  }, [messages]);

  useEffect(() => {
    setMessages(conversation?.messages ?? []);
  }, [conversation]);

  const updateHistory = () => {
    setState((prev) => {
      // TODO -- make api call to save history into firebase
      let history = prev.history ?? [];
      let updated = conversation;
      const filteredHistory = history.filter((obj: History) => {
        if (obj.id == conversation?.id) {
          obj.messages = messages;
          updated = obj;
          return false;
        }
        return true;
      }) as History[];
      return { ...prev, history: [...filteredHistory, updated as History] };
    });
  };

  const addHistoryItem = () => {
    setState((prev) => {
      // TODO -- make api call to save history into firebase
      let history = prev.history ?? [];
      const newHistory = {
        id: v4(),
        title: messages[0].content,
        messages: messages,
      };
      return {
        ...prev,
        currentConversation: newHistory as History,
        history: [...history, newHistory] as History[],
      };
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-between h-full p-5">
      <div className="flex flex-row justify-between w-full">
        <h1 className="text-3xl text-left w-full">New conversation</h1>
        <ModeToggle />
      </div>

      <div className="w-full grow border-2 rounded-md my-5 shadow flex-col p-4 justify-end space-y-3 overflow-scroll h-1 flex-nowrap">
        {messages &&
          messages.map((msg, i) => (
            <div
              key={`key-${i}`}
              className={
                "border p-3 w-fit max-w-[80%] rounded-md" +
                (msg.user == "user" ? " ml-auto bg-blue-200" : "bg-gray-200")
              }
            >
              {msg.content}
            </div>
          ))}
        {loading ? (
          <div className={"border p-3 w-fit max-w-[80%] rounded-md"}>
            Loading...
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="flex flex-row w-full">
        <input
          className="p-3 border-2 grow rounded-md mr-2"
          placeholder="prompt..."
          ref={inputRef}
        />
        <select className="p-2 mr-2 rounded-md" defaultValue={"none"}>
          <option value="none">choose Tos</option>
          {state?.context?.map((tos, i) => (
            <option key={`tos-${i}`} value={tos.name as string}>
              {tos.name}
            </option>
          ))}
        </select>
        <button
          className="border bg-blue-500 p-3 rounded-md font-bold text-white"
          onClick={handlePredict}
        >
          Send
        </button>
      </div>
    </div>
  );
}
