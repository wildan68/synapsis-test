"use client"
import { UserConfigContext } from "@/providers/user-config/provider"
import React from "react"

export const MainPage = () => {
  const { isLoggedIn } = React.useContext(UserConfigContext)
  console.log('isLoggedIn', isLoggedIn)

  if (isLoggedIn) {
    window.location.href = "/dashboard"
  }

  return (
    <React.Fragment>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div>Loading...</div>
      </main>
    </React.Fragment>
  )
}

export default MainPage