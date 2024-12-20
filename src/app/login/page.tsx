"use client"
import dynamic from "next/dynamic"
import React from "react"

const LoginContainer = dynamic(() => import("@/containers/login/root-container").then(mod => mod.LoginContainer), { ssr: false })

const LoginPage = () => {
  return (
    <LoginContainer />
  )
}

export default LoginPage