"use client"

import React, { createContext, ReactNode, useContext, useState } from "react";

type AuthLayoutContextType = {
  isAuthLayout: boolean;
  setAuthLayout: (isAuthLayout: boolean) => void;
};

const AuthLayoutContext = createContext<AuthLayoutContextType | undefined>(undefined);

export const AuthLayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthLayout, setAuthLayout] = useState(true);

  return (
    <AuthLayoutContext.Provider value={{ isAuthLayout, setAuthLayout }}>
      {children}
    </AuthLayoutContext.Provider>
  );
};

export const useAuthLayout = () => {
  const context = useContext(AuthLayoutContext);
  if (!context) {
    throw new Error("useAuthLayout must be used within an AuthLayoutProvider");
  }
  return context;
};