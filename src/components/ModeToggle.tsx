"use client";

import page from "@/app/page";
import { Page } from "@/types";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useState } from "react";
import { useGlobalState } from "@/state/globalState";

function ModeToggle() {
  const { state, setState } = useGlobalState();

  const handlePageChange = (e: any) => {
    setState((prev) => ({
      ...prev,
      page: e.target.value,
    }));
  };
  return (
    <select
      onChange={handlePageChange}
      className="p-2 rounded bg-blue-400  font-bold text-white decoration-none"
      value={state.page}
    >
      <option value={Page.ask_ai}>Ask AI</option>
      <option value={Page.upload}>Upload</option>
    </select>
  );
}

export default ModeToggle;
