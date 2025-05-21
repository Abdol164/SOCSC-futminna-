import type { LucideIcon } from "lucide-react"

export interface IEmail {
  id: string
  date: string
  subject: string
  body: string
  sender: string
  recipient: string
  isRead: boolean
}

export interface IPlan {
  name: string
  description: string
  monthlyPrice: string
  yearlyPrice: string
  yearlyDiscount: string
  features: string[]
  highlighted: boolean
  ctaText: string
  icon: LucideIcon
  color: string
}
