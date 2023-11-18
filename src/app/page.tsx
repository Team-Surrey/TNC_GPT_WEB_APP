"use client";

import { Chat, Upload } from "../components";
import { useGlobalState } from "@/state/globalState";
import { Page } from "@/types";

export default function Home() {
  const { state } = useGlobalState();

  return (
    <div className="h-full">
      {state.page == Page.ask_ai ? <Chat /> : <Upload />}
    </div>
  );
}
