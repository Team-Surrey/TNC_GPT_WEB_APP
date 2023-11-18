export type HistoryInput = {
  list: string[];
};

export enum Page {
  ask_ai = "ask",
  upload = "upload",
}

export type Message =  {
  content: String
  time: Date
  user: "user" | "ai"
}

export type History = {
  id: string,
  title: string,
  messages: Message[]
}

export type TosContext = {
  name: String,
  content: String
}