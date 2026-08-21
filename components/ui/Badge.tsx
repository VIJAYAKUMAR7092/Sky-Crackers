import * as React from "react"
import { cn } from "./utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
    secondary: "border-border/50 bg-secondary/50 text-secondary-foreground hover:bg-secondary",
    destructive: "border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/20",
    outline: "text-foreground border-border/60 bg-transparent",
    success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20",
    warning: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20"
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
