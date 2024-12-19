"use client"

import React from "react";
import { ReactQueryProvider } from "@/providers/react-query/provider";
import { UserConfigProvider } from "@/providers/user-config/provider";
import { AuthLayoutProvider, useAuthLayout } from "@/providers/layouts/provider";
import { AuthLayout } from "@/layouts/auth";
import { DefaultLayout } from "@/layouts/default";

const AppContent: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const { isAuthLayout } = useAuthLayout()

  const Layout = isAuthLayout ? AuthLayout : DefaultLayout;

  return (
    <Layout>
      {children}
    </Layout>
  )
}

export const AppProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <React.Fragment>
      <AuthLayoutProvider>
        <UserConfigProvider>
          <ReactQueryProvider>
            <AppContent>
              {children}
            </AppContent>
          </ReactQueryProvider>
        </UserConfigProvider>
      </AuthLayoutProvider>
    </React.Fragment>
  )
}