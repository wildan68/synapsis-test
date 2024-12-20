"use client"
import { ConfigProvider } from 'antd';
import React from 'react';

export const ThemeConfigContext = React.createContext<{
  darkMode: boolean
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
    }>({
      darkMode: false,
      setDarkMode: () => {}
    });

export function ThemeProvider({ children }: React.PropsWithChildren) {
  const [darkMode, setDarkMode] = React.useState(false);
  return (
    <ThemeConfigContext.Provider value={{ darkMode, setDarkMode }}>
      <ConfigProvider
        theme={{
          // 
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeConfigContext.Provider>
  )
}