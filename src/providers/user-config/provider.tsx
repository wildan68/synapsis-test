"use client"
import { setAuthorizationToken } from "@/lib/api";
import React from "react";

const UserConfigContext = React.createContext({
  token: "",
})

export const UserConfigProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const getTokenLocalStorage = (): string => {
    const token = localStorage.getItem("token")
    return token || ""
  }
  if (!getTokenLocalStorage()) {
    window.location.href = "/login"
  }

  if (getTokenLocalStorage()) {
    setAuthorizationToken(getTokenLocalStorage())
    window.location.href = "/dashboard"
  }
  
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

export const useUserConfig = () => React.useContext(UserConfigContext);