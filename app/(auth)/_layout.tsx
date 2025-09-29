import React from 'react'
import { ThemeProvider } from '@/context/ThemeContext'
import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{
        headerShown: false,
        animation: "slide_from_right"
      }}
      />
    </ThemeProvider>
  )
}