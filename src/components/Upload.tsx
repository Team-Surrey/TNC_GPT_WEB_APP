"use client";

import ModeToggle from "./ModeToggle";
import { useGlobalState } from "@/state/globalState";
import { useRef } from "react";
import { TosContext } from "@/types";




const UPLOAD_COLLECTION_KEY = "tos"; // MSG - the collection name

export default function Upload() {
  const { state, setState } = useGlobalState();
  const nameRef = useRef<any>(null);
  const contentRef = useRef<any>(null);

  const handleUpload = async () => {
    const newTos = {
      name: (nameRef?.current as any).value,
      content: (contentRef?.current as any).value,
    };
        // TODO firestore

        setState((prev) => {
          let newContext = prev?.context || [];
          newContext.push(newTos);
          return { ...prev, context: newContext as TosContext[] };
        });
        // nameRef?.current?.value = ""
        // contentRef?.current?.value = ""
        // TODO - reset nameRef and upload state

  };

  return (
    <div className="flex w-full flex-col items-center justify-between p-5 ">
      <div className="flex flex-row justify-between w-full">
        <h1 className="text-3xl text-left w-full">My Terms and Conditions</h1>
        <ModeToggle />
      </div>
      <div className="flex flex-row justify-between w-full h-full py-5 align-middle">
        <div className="border-2 rounded-md shadow flex-col overflow-scroll flex-nowrap w-40 h-full">
          <h2 className="text-center font-bold">Saved TnC's</h2>
          {state?.context &&
            state.context.map((tos) => (
              <div key={`key-${tos.name}`}>
                <h1>{tos.name}</h1>
              </div>
            ))}
        </div>
        <div className="flex flex-col grow items-center self-center h-80">
          <h2 className="font-bold p-3 text-lg">Add new TnC</h2>
          <input
            placeholder="Name..."
            ref={nameRef}
            className="p-2 rounded-md border"
          />
          <textarea
            placeholder="Tos..."
            ref={contentRef}
            className="border p-2 rounded-md grow"
          />
          <button onClick={handleUpload} className="border p-2 rounded-md w-60">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
