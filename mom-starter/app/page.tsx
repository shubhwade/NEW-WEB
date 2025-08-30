"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, TrendingUp } from "lucide-react"
import { WelcomeScreen } from "@/components/welcome-screen"
import { Dashboard } from "@/components/dashboard"
import { TransactionsList } from "@/components/transactions-list"
import { Analytics } from "@/components/analytics"
import { SettingsPanel } from "@/components/settings-panel"
import { AddTransactionModal } from "@/components/add-transaction-modal"
import { Sidebar } from "@/components/sidebar"
import { AIChat } from "@/components/ai-chat"
import { PriceComparisonMap } from "@/components/price-comparison-map"
import { CreditFooter } from "@/components/credit-footer"
import { useAuth } from "@/context/auth-context"

export type Transaction = {
  id: number
  type: "income" | "expense"
  amount: number
  category: string
  description: string
  date: string
}

export type Category = {
  id: string
  label: string
  color: string
  icon: string
  type: "income" | "expense"
}

export const CATEGORIES: Category[] = [
  { id: "Income", label: "Income", color: "#22c55e", icon: "trending-up", type: "income" },
  { id: "Food & Dining", label: "Food & Dining", color: "#dc2626", icon: "utensils", type: "expense" },
  { id: "Transportation", label: "Transportation", color: "#0ea5e9", icon: "car", type: "expense" },
  { id: "Shopping", label: "Shopping", color: "#d97706", icon: "shopping-bag", type: "expense" },
  { id: "Entertainment", label: "Entertainment", color: "#f59e0b", icon: "film", type: "expense" },
  { id: "Bills & Utilities", label: "Bills & Utilities", color: "#06b6d4", icon: "zap", type: "expense" },
  { id: "Health & Fitness", label: "Health & Fitness", color: "#84cc16", icon: "heart-pulse", type: "expense" },
  { id: "Education", label: "Education", color: "#14b8a6", icon: "book", type: "expense" },
  { id: "Travel", label: "Travel", color: "#f97316", icon: "plane", type: "expense" },
  { id: "Other", label: "Other", color: "#64748b", icon: "box", type: "expense" },
]

export default function HomePage() {
  const { user, login, logout, isLoading } = useAuth()
  const [currentSection, setCurrentSection] = useState("dashboard")
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    if (!user) return
    try {
      const storedTransactions = localStorage.getItem("mom_transactions")
      if (storedTransactions) {
        const parsed = JSON.parse(storedTransactions)
        if (Array.isArray(parsed)) {
          setTransactions(parsed)
        }
      }
    } catch (error) {
      console.error("Error loading transactions:", error)
      localStorage.removeItem("mom_transactions")
    }
  }, [user])

  useEffect(() => {
    if (!user || transactions.length === 0) return
    try {
      localStorage.setItem("mom_transactions", JSON.stringify(transactions))
    } catch (error) {
      console.error("Error saving transactions:", error)
    }
  }, [transactions, user])

  const handleNameSubmit = (name: string) => {
    login(name)
  }

  const handleLogout = () => {
    logout()
    setTransactions([])
    try {
      localStorage.removeItem("mom_transactions")
    } catch (error) {
      console.error("Error clearing localStorage:", error)
    }
    setCurrentSection("dashboard")
  }

  const deleteTransaction = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  const calcSums = () => {
    const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
    const expense = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
    return { income, expense, balance: income - expense }
  }

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    try {
      if (!transaction.amount || transaction.amount <= 0) {
        throw new Error("Invalid amount")
      }
      if (!transaction.description?.trim()) {
        throw new Error("Description is required")
      }
      if (!transaction.date) {
        throw new Error("Date is required")
      }
      if (transaction.type === "expense" && !transaction.category) {
        throw new Error("Category is required for expenses")
      }
      const newTransaction: Transaction = {
        ...transaction,
        id: Date.now() + Math.random(),
        description: transaction.description.trim(),
      }
      setTransactions((prev) => [newTransaction, ...prev])
      setShowAddModal(false)
    } catch (error) {
      console.error("Error adding transaction:", error)
      alert(`Failed to add transaction: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }
  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-to-br from-background via-muted/30 to-accent/5">
        <div className="text-center slide-up">
          <div className="w-16 h-16 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary grid place-items-center relative">
            <div className="text-xl font-bold font-sans">MOM</div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full grid place-items-center">
              <TrendingUp className="h-2.5 w-2.5 text-accent-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
            <p className="text-muted-foreground font-serif">Loading your financial intelligence...</p>
          </div>
        </div>
      </div>
    )
  }
  if (!user) {
    return <WelcomeScreen onSubmit={handleNameSubmit} />
  }
  const renderCurrentSection = () => {
    switch (currentSection) {
      case "dashboard":
        return (
          <Dashboard
            transactions={transactions}
            onAddTransaction={() => setShowAddModal(true)}
            onViewAnalytics={() => setCurrentSection("analytics")}
            onViewTransactions={() => setCurrentSection("transactions")}
            onViewPriceMaps={() => setCurrentSection("price-maps")}
          />
        )
      case "transactions":
        return <TransactionsList transactions={transactions} onDeleteTransaction={deleteTransaction} />
      case "analytics":
        return <Analytics transactions={transactions} />
      case "price-maps":
        return <PriceComparisonMap />
      case "settings":
        return (
          <SettingsPanel
            userName={user.name}
            onNameChange={(name) => {
              login(name)
            }}
            onSeedData={() => {
              const demoTransactions: Transaction[] = [
                {
                  id: Date.now() + 1,
                  type: "income",
                  amount: 50000,
                  category: "Income",
                  description: "Salary",
                  date: "2025-08-01",
                },
                {
                  id: Date.now() + 2,
                  type: "expense",
                  amount: 3200,
                  category: "Food & Dining",
                  description: "Groceries",
                  date: "2025-08-02",
                },
                {
                  id: Date.now() + 3,
                  type: "expense",
                  amount: 800,
                  category: "Transportation",
                  description: "Metro/Auto",
                  date: "2025-08-03",
                },
                {
                  id: Date.now() + 4,
                  type: "expense",
                  amount: 1400,
                  category: "Entertainment",
                  description: "Movie + snacks",
                  date: "2025-08-05",
                },
                {
                  id: Date.now() + 5,
                  type: "expense",
                  amount: 2200,
                  category: "Bills & Utilities",
                  description: "Electricity",
                  date: "2025-08-07",
                },
              ]
              setTransactions(demoTransactions)
            }}
            onClearData={() => {
              setTransactions([])
              try {
                localStorage.removeItem("mom_transactions")
              } catch (error) {
                console.error("Error clearing localStorage:", error)
              }
            }}
          />
        )
      default:
        return null
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/5">
      <div className="min-h-screen grid md:grid-cols-[280px_1fr]">
        <Sidebar
          userName={user.name}
          currentSection={currentSection}
          onSectionChange={setCurrentSection}
          onLogout={handleLogout}
          className="hidden md:flex"
        />
        <header className="md:hidden sticky top-0 z-10 glass-effect border-b border-white/20">
          <div className="flex items-center justify-between px-4 py-4">
            <Button variant="outline" size="sm" onClick={() => setShowMobileMenu(true)} className="glass-effect">
              <Menu className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary grid place-items-center relative">
                <div className="text-sm font-bold font-sans">MOM</div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent rounded-full grid place-items-center">
                  <TrendingUp className="h-1.5 w-1.5 text-accent-foreground" />
                </div>
              </div>
              <div className="font-serif font-bold text-lg text-primary">MOM</div>
            </div>
            <div className="text-sm text-muted-foreground font-medium">Hi, {user.name.split(" ")[0]}!</div>
          </div>
        </header>
        {showMobileMenu && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowMobileMenu(false)} />
            <div className="fixed left-0 top-0 h-full w-72 glass-effect border-r border-white/20 slide-up">
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary grid place-items-center relative">
                    <div className="text-sm font-bold font-sans">MOM</div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent rounded-full grid place-items-center">
                      <TrendingUp className="h-1.5 w-1.5 text-accent-foreground" />
                    </div>
                  </div>
                  <div className="font-serif font-bold text-xl text-primary">Menu</div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowMobileMenu(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Sidebar
                userName={user.name}
                currentSection={currentSection}
                onSectionChange={(section) => {
                  setCurrentSection(section)
                  setShowMobileMenu(false)
                }}
                onLogout={handleLogout}
                className="flex"
              />
            </div>
          </div>
        )}
        <main className="p-6 md:p-10">
          <div className="mb-8 md:mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary grid place-items-center relative">
                <div className="text-lg font-bold font-sans">MOM</div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full grid place-items-center">
                  <TrendingUp className="h-2 w-2 text-accent-foreground" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-sans font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
                  MOM Financial Intelligence
                </h1>
                <div className="text-lg md:text-xl text-muted-foreground font-serif">My Overspending Monitor</div>
              </div>
            </div>
            <p className="text-muted-foreground text-lg font-serif font-normal max-w-2xl">
              Premium financial intelligence platform with real-time insights, AI-powered analysis, and smart
              recommendations designed for your financial success.
            </p>
          </div>
          <div className="fade-in">{renderCurrentSection()}</div>
          <CreditFooter />
        </main>
      </div>
      <AddTransactionModal open={showAddModal} onOpenChange={setShowAddModal} onSubmit={addTransaction} />
      {user && <AIChat transactions={transactions} userName={user.name} />}
    </div>
  )
}
