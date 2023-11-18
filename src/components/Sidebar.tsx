"use client";

import { useGlobalState } from "@/state/globalState";
import { Button } from "@mui/material";
import {auth} from "@/firebase/clientApp";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import React from "react";

function Sidebar({ children }: { children: React.ReactNode }) {
  const { state, setState } = useGlobalState();
  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth,provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */

        console.log(result);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
  const handleNewConversation = () => {
    setState((prev) => ({ ...prev, currentConversation: undefined }));
  };
  return (
    <div className="flex flex-col w-60 max-w-[15rem] items-center justify-center bg-blue-100 shadow-lg min-h-screen">
      <button
        className="p-2 bg-blue-400 w-full font-bold text-white hover:bg-blue-300"
        onClick={handleNewConversation}
      >
        Start New
      </button>
      <div className="grow overflow w-full">{children}</div>

      {state.auth ? (
        <Button>Logout</Button>
      ) : (
        <button
          className="bg-blue-400 font-bold text-white py-2 mx-2 w-full"
          onClick={handleLogin}
        >
          Login
        </button>
      )}
    </div>
  );
}

export default Sidebar;
