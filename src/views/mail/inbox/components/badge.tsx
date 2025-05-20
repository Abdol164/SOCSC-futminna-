import type React from "react"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "secondary"
  children: React.ReactNode
}

export function Badge({ variant = "default", className = "", children, ...props }: BadgeProps) {
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    outline: "border border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  }

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
