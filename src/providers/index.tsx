"use client"

import React from "react";
import { ReactQueryProvider } from "@/providers/react-query/provider";

export const AppProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
  return (
    <React.Fragment>
      <ReactQueryProvider>
        {children}
      </ReactQueryProvider>
    </React.Fragment>
  )
}