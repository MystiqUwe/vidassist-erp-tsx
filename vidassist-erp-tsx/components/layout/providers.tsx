"use client";
import React from "react";
import ThemeProvider from "./ThemeToggle/theme-provider";

export default function Providers() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    ></ThemeProvider>
  );
}
