"use client"

import React from "react";
import { ReactQueryProvider } from "@/providers/react-query/provider";
import { UserConfigProvider } from "./user-config/provider";

export const AppProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
  return (
    <React.Fragment>
      <UserConfigProvider>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </UserConfigProvider>
    </React.Fragment>
  )
}