import { useGlobalState } from "@/state/globalState";
import { History } from "@/types";
import { useEffect, useState } from "react";

function useConversation() {
  const [conversation, setConversation] = useState<History>();
  const { state } = useGlobalState();
  useEffect(() => {
    setConversation(state.currentConversation);
  }, [state]);
  return [conversation];
}

export default useConversation;
