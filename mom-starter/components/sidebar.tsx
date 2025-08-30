"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, PieChartIcon as ChartPie, CreditCard, BarChart3, Settings, MapPin, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  userName: string
  currentSection: string
  onSectionChange: (section: string) => void
  onLogout: () => void
  className?: string
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: ChartPie, color: "text-primary" },
  { id: "transactions", label: "Transactions", icon: CreditCard, color: "text-destructive" },
  { id: "analytics", label: "Analytics", icon: BarChart3, color: "text-accent" },
  { id: "price-maps", label: "Price Maps", icon: MapPin, color: "text-green-600" },
  { id: "settings", label: "Settings", icon: Settings, color: "text-muted-foreground" },
]

export function Sidebar({ userName, currentSection, onSectionChange, onLogout, className }: SidebarProps) {
  // Render your sidebar as per the code provided earlier, with branding, nav buttons, user card and logout
}
