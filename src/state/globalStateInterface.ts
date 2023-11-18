import { Message, Page,History } from "@/types";



export interface GlobalStateInterface {
    history: History[],
    auth: boolean,
    page: Page
    currentConversation: History,
  }
  