import { setAuthorizationToken } from "@/lib/api";
import { getCookie } from "@/lib/cookies";
import React, { useCallback } from "react";

export const UserConfigContext = React.createContext({
  isLoggedIn: false,
  token: ""
})

export function UserConfigProvider({ children }: React.PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [token, setToken] = React.useState("")
  
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
      }
    })
  }, [getToken])

  return (
    <UserConfigContext.Provider value={{ isLoggedIn, token }}>
      <React.Fragment>
        {children}
      </React.Fragment>
    </UserConfigContext.Provider>
  );
}