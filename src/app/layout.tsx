

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  Stack,

} from "@mui/material";

import { History, ModeToggle, Sidebar } from "../components";
import {GlobalStateProvider} from "@/state/globalState"
import {Page} from "@/types"
import { GlobalStateInterface } from "@/state/globalStateInterface";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TnC App",
  description: "TnC app",
};


const initState:Partial<GlobalStateInterface> = {
  history: [],
  page: Page.ask_ai
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex w-screen min-h-screen items-center justify-between">
          <GlobalStateProvider value={initState}>
          <Stack direction="row" spacing={2} className="w-full h-full">
            <Sidebar >
              <History/>
            </Sidebar>

            <div className="flex flex-col min-h-screen w-full align-middle">
              

              <div className="grow">
              {children}
              </div>
            </div>
              

          </Stack>
          </GlobalStateProvider>
        </main>
      </body>
    </html>
  );
}
