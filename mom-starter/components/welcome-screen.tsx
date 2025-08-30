"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Shield, Zap, Globe } from "lucide-react"

interface WelcomeScreenProps {
  onSubmit: (name: string) => void
}

export function WelcomeScreen({ onSubmit }: WelcomeScreenProps) {
  const [name, setName] = useState("")
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim().length >= 2) {
      onSubmit(name.trim())
    }
  }
  return (
    // Render welcome UI and name input as per your earlier provided component code
  )
}
