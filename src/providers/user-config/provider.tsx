"use client"

import { setAuthorizationToken } from "@/lib/api";
import { getCookie } from "@/lib/cookies";
import React, { useCallback } from "react";
import { useAuthLayout } from "@/providers/layouts/provider";

export const UserConfigContext = React.createContext<{ 
  isLoggedIn: boolean, 
  token: string,
  userId: number | null
}>({
  isLoggedIn: false,
  token: "",
  userId: null
})

export function UserConfigProvider({ children }: React.PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [userId, setUserId] = React.useState<number | null>(null)
  const [token, setToken] = React.useState("")
  const { setAuthLayout } = useAuthLayout()
  
  const getToken = useCallback(async () => {
    const token = await getCookie("token")

    return token
  }, [])

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
    <UserConfigContext.Provider value={{ isLoggedIn, token, userId }}>
      <React.Fragment>
        {children}
      </React.Fragment>
    </UserConfigContext.Provider>
  );
}