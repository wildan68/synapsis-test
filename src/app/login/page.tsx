"use client"
import { UserConfigContext } from "@/providers/user-config/provider"
import dynamic from "next/dynamic"
import React from "react"

const LoginContainer = dynamic(() => import("@/containers/login/root-container").then(mod => mod.LoginContainer), { ssr: false })

export const LoginPage = () => {
  const { isLoggedIn } = React.useContext(UserConfigContext)
  console.log('isLoggedIn', isLoggedIn)
  return (
    <LoginContainer />
  )
}

export default LoginPage