import { Message, Page,History, TosContext } from "@/types";



export interface GlobalStateInterface {
    history: History[],
    auth: boolean,
    page: Page
    currentConversation: History,
    context: TosContext[]
  }
  