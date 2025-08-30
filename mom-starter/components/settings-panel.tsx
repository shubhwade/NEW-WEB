"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { APIStatusDashboard } from "@/components/api-status-dashboard"

interface SettingsPanelProps {
  userName: string
  onNameChange: (name: string) => void
  onSeedData: () => void
  onClearData: () => void
}

export function SettingsPanel({ userName, onNameChange, onSeedData, onClearData }: SettingsPanelProps) {
  const [nameInput, setNameInput] = useState(userName)
  const handleSaveName = () => {
    if (nameInput.trim()) {
      onNameChange(nameInput.trim())
    }
  }
  const handleClearData = () => {
    if (confirm("Clear all local data? This action cannot be undone.")) {
      onClearData()
    }
  }
  return (
    <div className="space-y-6">
      <Card className="p-5 glass-effect">
        <div className="font-semibold mb-4 font-sans">Personalization</div>
        <div className="grid sm:grid-cols-[1fr_auto] gap-3">
          <div>
            <Label htmlFor="name" className="font-serif">
              Your Name
            </Label>
            <Input
              id="name"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="rounded-2xl"
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleSaveName}
              className="rounded-2xl bg-foreground text-background hover:bg-foreground/90 font-semibold"
            >
              Save
            </Button>
          </div>
        </div>
      </Card>
      <Card className="p-5 glass-effect">
        <div className="font-semibold mb-3 font-sans">Sample Data</div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={onSeedData} className="rounded-xl bg-card hover:bg-card/80">
            Add Demo Transactions
          </Button>
          <Button variant="destructive" onClick={handleClearData} className="rounded-xl">
            Clear All Data
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 font-serif">
          Use demo data to explore features, or clear everything to start fresh.
        </p>
      </Card>
      <APIStatusDashboard />
    </div>
  )
}
