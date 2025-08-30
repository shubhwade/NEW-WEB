import { NextResponse } from "next/server"

const FRED_API_KEY = process.env.FRED_API_KEY
const FRED_SERIES_ID = "CPIAUCSL"
const FRED_API_URL = `https://api.stlouisfed.org/fred/series/observations?series_id=${FRED_SERIES_ID}&api_key=${FRED_API_KEY}&file_type=json`

export async function GET() {
  try {
    let data
    if (!FRED_API_KEY) {
      // Fallback demo data
      data = {
        currentCPI: 300,
        previousCPI: 298,
        lastUpdated: new Date().toISOString(),
        monthlyInflation: 0.67,
        yearOverYearInflation: 5.3,
        observations: [],
        demo: true,
      }
    } else {
      const res = await fetch(FRED_API_URL)
      if (!res.ok) throw new Error("Failed to fetch CPI data")
      const json = await res.json()
      const obs = json.observations || []
      if (obs.length < 2) {
        return NextResponse.json({
          success: false,
          error: "Not enough CPI data available",
        }, { status: 500 })
      }
      const currentCPI = Number(obs[obs.length - 1]?.value) || 0
      const previousCPI = Number(obs[obs.length - 2]?.value) || 0
      const monthlyInflation = ((currentCPI / previousCPI - 1) * 100) || 0
      const yearOverYearInflation = monthlyInflation * 12 // Simplified

      data = {
        currentCPI,
        previousCPI,
        lastUpdated: obs[obs.length - 1]?.date || new Date().toISOString(),
        monthlyInflation,
        yearOverYearInflation,
        observations: obs.map((item: any) => ({
          date: item.date,
          value: Number(item.value),
          formattedDate: new Date(item.date).toLocaleDateString("en-GB", {
            month: "short",
            year: "numeric",
          }),
        })),
        demo: false,
      }
    }
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("CPI API error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch CPI data" }, { status: 500 })
  }
}
