"use client"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Bot, User, Sparkles, TrendingUp, PiggyBank, Target } from "lucide-react"
import type { Transaction } from "@/app/page"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp?: Date
}

interface AIChatProps {
  transactions: Transaction[]
  userName: string
}
export function AIChat({ transactions, userName }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hi ${userName.split(" ")[0]}! I'm MOM, your premium AI financial assistant. I can analyze your spending patterns, provide personalized investment advice, and help you understand how inflation affects your money. What financial goal can I help you achieve today?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // See earlier detailed implementation for full streaming and message handling
  
  // Auto-scroll on messages
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  // Render minimized state button or full chat UI as shown in your code

  return (
    // Render logic as per your detailed ai-chat.tsx component code
    // Including chat toggle button, header, message list, suggested queries, input box, send button
  )
}
"use client"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Bot, User, Sparkles, TrendingUp, PiggyBank, Target } from "lucide-react"
import type { Transaction } from "@/app/page"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp?: Date
}

interface AIChatProps {
  transactions: Transaction[]
  userName: string
}
export function AIChat({ transactions, userName }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hi ${userName.split(" ")[0]}! I'm MOM, your premium AI financial assistant. I can analyze your spending patterns, provide personalized investment advice, and help you understand how inflation affects your money. What financial goal can I help you achieve today?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll on messages update
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  // Message submission, streaming, error handling etc. (implement per your earlier code)

  return (
    isOpen ? (
      <div className={`fixed bottom-6 right-6 z-50`}>
        {/* Full chat card UI with header, messages, input field */}
      </div>
    ) : (
      <div className={`fixed bottom-6 right-6 z-50`}>
        {/* Minimized chat toggle button with notification badges */}
      </div>
    )
  )
}
"use client"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Bot, User, Sparkles, TrendingUp, PiggyBank, Target } from "lucide-react"
import type { Transaction } from "@/app/page"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp?: Date
}

interface AIChatProps {
  transactions: Transaction[]
  userName: string
}
export function AIChat({ transactions, userName }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hi ${userName.split(" ")[0]}! I'm MOM, your premium AI financial assistant. I can analyze your spending patterns, provide personalized investment advice, and help you understand how inflation affects your money. What financial goal can I help you achieve today?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll on messages update
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  // Message submission, streaming, error handling etc. (implement per your earlier code)

  return (
    isOpen ? (
      <div className={`fixed bottom-6 right-6 z-50`}>
        {/* Full chat card UI with header, messages, input field */}
      </div>
    ) : (
      <div className={`fixed bottom-6 right-6 z-50`}>
        {/* Minimized chat toggle button with notification badges */}
      </div>
    )
  )
}
