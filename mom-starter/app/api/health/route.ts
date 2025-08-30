import { NextResponse } from "next/server"

export async function GET() {
  const timestamp = new Date().toISOString()

  // Simplified health checks; extend to call actual APIs if desired
  const services = [
    {
      service: "FRED API",
      status: process.env.FRED_API_KEY ? "healthy" : "not_configured",
      description: "Federal Reserve Economic Data API",
      configured: Boolean(process.env.FRED_API_KEY),
      lastChecked: timestamp,
    },
    {
      service: "OpenAI API",
      status: process.env.OPENAI_API_KEY ? "healthy" : "not_configured",
      description: "OpenAI Chat Completion API",
      configured: Boolean(process.env.OPENAI_API_KEY),
      lastChecked: timestamp,
    },
    {
      service: "Geolocation API",
      status: "browser_dependent",
      description: "Browser Geolocation API support",
      configured: true,
      lastChecked: timestamp,
    },
  ]

  // Aggregate summary counts
  const summary = services.reduce(
    (acc, svc) => {
      acc[svc.status] = (acc[svc.status] || 0) + 1
      return acc
    },
    { healthy: 0, degraded: 0, unhealthy: 0, not_configured: 0 }
  )

  return NextResponse.json({ status: "ok", timestamp, services, summary })
}
