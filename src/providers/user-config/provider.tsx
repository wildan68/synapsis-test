"use client"

import { setAuthorizationToken } from "@/lib/api";
import { deleteCookie, getCookie, setCookie } from "@/lib/cookies";
import React, { useCallback } from "react";
import { useAuthLayout } from "@/providers/layouts/provider";

export const UserConfigContext = React.createContext<{ 
  isLoggedIn: boolean, 
  token: string,
  userId: number | null
  onLogout: () => void
    }>({
      isLoggedIn: false,
      token: "",
      userId: null,
      onLogout: () => {}
    })

export function UserConfigProvider({ children }: React.PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [userId, setUserId] = React.useState<number | null>(null)
  const [name, setName] = React.useState("")
  const [token, setToken] = React.useState("")
  const { setAuthLayout } = useAuthLayout()
  
  const getToken = useCallback(async () => {
    const token = await getCookie("token")

    return token
  }, [])

  const onLogout = () => {
    setIsLoggedIn(false)
    setToken("")
    deleteCookie("token")
    window.location.href = "/login"
  }

  React.useEffect(() => {
    getToken().then((token) => {
      if (token) {
        setIsLoggedIn(true)
        setToken(token)
        setAuthorizationToken(token);
        setAuthLayout(false)
        setUserId(7591023)
      }
    })
  }, [getToken, setAuthLayout, isLoggedIn])

  return (
    <UserConfigContext.Provider value={{ isLoggedIn, token, userId, onLogout }}>
      <React.Fragment>
        {children}
      </React.Fragment>
    </UserConfigContext.Provider>
  );
}