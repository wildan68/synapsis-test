"use client"
import { UserConfigContext } from "@/providers/user-config/provider"
import React from "react"

const MainPage = () => {
  const { isLoggedIn } = React.useContext(UserConfigContext)

  if (isLoggedIn) {
    window.location.href = "/dashboard"
  }

  return (
    <React.Fragment>
      <main className="flex min-h-screen w-full flex-col items-center justify-center">
        <div>Loading...</div>
      </main>
    </React.Fragment>
  )
}

export default MainPage