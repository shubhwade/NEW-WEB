"use client"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-background via-muted/30 to-accent/5" aria-busy="true">
      <Card className="p-8 glass-effect shadow-lg flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary grid place-items-center relative">
          <div className="text-xl font-bold font-sans">MOM</div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-accent rounded-full grid place-items-center">
            <TrendingUp className="h-3 w-3 text-accent-foreground" />
          </div>
        </div>
        <CardContent>
          <div className="text-center text-muted-foreground font-serif text-lg">
            Loading your financial intelligence...
          </div>
          <div className="flex justify-center mt-4 gap-2 text-primary">
            <span className="w-3 h-3 rounded-full bg-primary animate-bounce delay-75"></span>
            <span className="w-3 h-3 rounded-full bg-primary animate-bounce delay-150"></span>
            <span className="w-3 h-3 rounded-full bg-primary animate-bounce delay-300"></span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
