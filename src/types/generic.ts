import type { LucideIcon } from "lucide-react"

export interface IUser {
  address: string
  suimailNs?: string
  mailFee: number
  whitelist: string[]
  blacklist: string[]
}

export interface IEmail {
  id: string
  subject: string
  body: string
  sender: Pick<IUser, "suimailNs">
  recipient: Pick<IUser, "suimailNs">
  isRead: boolean
  createdAt: string
  digest?: string
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
