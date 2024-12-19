"use client"
import React, { ReactNode } from "react";

export const AuthLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main>{children}</main>
  );
};