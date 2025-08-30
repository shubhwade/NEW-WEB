"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, Settings, Globe } from "lucide-react"

interface HealthCheck {
  service: string
  status: "healthy" | "degraded" | "unhealthy" | "not_configured" | "browser_dependent"
  description: string
  configured: boolean
  error?: string
  note?: string
  lastChecked: string
}

interface HealthData {
  status: string
  timestamp: string
  services: HealthCheck[]
  summary: {
    healthy: number
    degraded: number
    unhealthy: number
    not_configured: number
  }
}

export function APIStatusDashboard() {
  const [healthData, setHealthData] = useState<HealthData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchHealthData = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/health")
      if (!res.ok) throw new Error("Failed to load API status")
      const data = await res.json()
      setHealthData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHealthData()
  }, [])

  if (loading) {
    return (
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 animate-spin" />
            Checking API Status...
          </CardTitle>
        </CardHeader>
      </Card>
    )
  }

  if (error || !healthData) {
    return (
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            API Status Check Failed
          </CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" size="sm" onClick={fetchHealthData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>API Status Dashboard</span>
            <Button variant="ghost" size="sm" onClick={fetchHealthData}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Last updated: {new Date(healthData.timestamp).toLocaleString()}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            <div>
              <div className="font-bold text-green-600">{healthData.summary.healthy}</div>
              <div>Healthy</div>
            </div>
            <div>
              <div className="font-bold text-yellow-600">{healthData.summary.degraded}</div>
              <div>Degraded</div>
            </div>
            <div>
              <div className="font-bold text-red-600">{healthData.summary.unhealthy}</div>
              <div>Unhealthy</div>
            </div>
            <div>
              <div className="font-bold text-gray-600">{healthData.summary.not_configured}</div>
              <div>Not Configured</div>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {healthData.services.map((service) => (
              <div
                key={service.service}
                className="p-4 rounded-lg bg-muted/30 border border-border flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold">{service.service}</div>
                  <div className="text-xs text-muted-foreground">{service.description}</div>
                  {service.error && (
                    <div className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" /> {service.error}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground mt-1">
                    Configured: {service.configured ? "Yes" : "No"} • Last checked:{" "}
                    {new Date(service.lastChecked).toLocaleTimeString()}
                  </div>
                </div>
                <div>
                  {(() => {
                    switch (service.status) {
                      case "healthy":
                        return <CheckCircle className="h-6 w-6 text-green-600" />
                      case "degraded":
                        return <AlertTriangle className="h-6 w-6 text-yellow-600" />
                      case "unhealthy":
                        return <XCircle className="h-6 w-6 text-red-600" />
                      case "not_configured":
                        return <Settings className="h-6 w-6 text-gray-600" />
                      case "browser_dependent":
                        return <Globe className="h-6 w-6 text-blue-600" />
                      default:
                        return <AlertTriangle className="h-6 w-6 text-gray-600" />
                    }
                  })()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
