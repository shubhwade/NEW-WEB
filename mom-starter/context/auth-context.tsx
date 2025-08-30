"use client"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  name: string
  email?: string
  avatar?: string
  preferences?: {
    currency: string
    location: string
    notifications: boolean
  }
  createdAt: string
  lastLogin: string
}

interface AuthContextType {
  user: User | null
  login: (name: string, email?: string) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  isLoading: boolean
  sessionDuration: number
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Use your full AuthProvider implementation loading user from localStorage,
  // handling login, logout, updateUser, and sessionDuration tracking as previously shared
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
