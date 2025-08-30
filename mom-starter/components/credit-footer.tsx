import { Code, Shield, Heart } from "lucide-react"

export function CreditFooter() {
  return (
    <footer className="mt-16 border-t border-white/10 pt-8">
      <div className="glass-effect rounded-xl p-6 border border-white/20 card-hover">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-white/20">
              <Code className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-serif font-semibold text-lg">Developed by Shubh Wade</p>
              <p className="text-sm text-muted-foreground">MOM - Premium Financial Intelligence Platform</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Made with passion for financial freedom</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>© 2025 All Rights Reserved</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
