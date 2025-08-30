import type React from "react"
import type { Metadata } from "next"
import { Work_Sans } from "next/font/google"
import { Open_Sans } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/auth-context"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})
const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "MOM — My Overspending Monitor",
  description:
    "Premium financial intelligence platform with real-time insights, AI assistance, and smart analytics. Take control of your finances with MOM.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${workSans.variable} ${openSans.variable} antialiased`}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
