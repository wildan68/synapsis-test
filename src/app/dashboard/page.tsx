"use client"
import dynamic from "next/dynamic"
import React from "react"

const DashboardContainer = dynamic(() => import("@/containers/dashboard/root-container").then(mod => mod.DashboardContainer), { ssr: false })

export const LoginPage = () => {
  return (
    <DashboardContainer />
  )
}

export default LoginPage