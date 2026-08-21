import * as React from "react"
import { cn } from "./utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

export const buttonVariants = ({ variant = "default", size = "default" }: { variant?: ButtonProps["variant"], size?: ButtonProps["size"] } = {}) => {
  const variants = {
    default: "bg-primary text-primary-foreground hover:opacity-90 shadow-[0_0_15px_rgba(197,160,89,0.3)] hover:shadow-[0_0_20px_rgba(197,160,89,0.5)] border border-primary/20",
    destructive: "bg-destructive text-destructive-foreground hover:opacity-90 shadow-[0_0_15px_rgba(153,27,27,0.3)] border border-destructive/20",
    outline: "border-2 border-input bg-background/50 backdrop-blur-sm hover:bg-secondary/50 hover:text-foreground hover:border-border",
    secondary: "bg-secondary text-secondary-foreground hover:opacity-80 shadow-sm border border-border/50",
    ghost: "hover:bg-secondary/50 hover:text-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  }

  const sizes = {
    default: "h-10 px-5 py-2",
    sm: "h-9 rounded-lg px-4 text-xs tracking-wide",
    lg: "h-12 rounded-xl px-8 text-base",
    icon: "h-10 w-10 rounded-full",
  }

  return cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold tracking-wide ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:-translate-y-[1px]",
    variants[variant || "default"],
    sizes[size || "default"]
  )
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild: _asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
