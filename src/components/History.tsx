"use client";

import { useGlobalState } from "@/state/globalState";
import { History } from "@/types";

export default function History() {
  const { state, setState } = useGlobalState();

  const handleChangeContext = (id: string) => {
    setState((prev) => {
      let newContext = (prev.history ?? []).find(
        (obj: History) => obj.id == id
      );

      return { ...prev, currentConversation: newContext };
    });
  };

  return (
    <div className="flex flex-col-reverse w-full ">
      {state.history &&
        state.history.map((value: History) => (
          <button
            className={
              "bg-transparent hover:bg-blue-500 hover:text-white py-2 w-full text-ellipsis p-2 max-w-[15rem] whitespace-nowrap" +
              (state?.currentConversation?.id == value.id
                ? " bg-blue-400 text-white"
                : " text-blue-700 bg-blue-500")
            }
            key={value.id}
            onClick={(e) => handleChangeContext(value.id)}
          >
            {value.title}
          </button>
        ))}
    </div>
  );
}
