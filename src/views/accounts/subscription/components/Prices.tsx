import { Mail, Zap, Crown } from 'lucide-react'
import { PricingCard } from './PricingCard'
import type { IPlan } from '@/types/generic'
import type { BillingCycle } from './SubscriptionHeader'

export default function SubscriptionPlans({
  billingCycle,
}: {
  billingCycle: BillingCycle
}) {
  const plans: IPlan[] = [
    {
      name: 'Basic',
      description: 'Perfect for personal use',
      monthlyPrice: '0.1 SUI',
      yearlyPrice: '0.5 SUI',
      yearlyDiscount: 'Save 17%',
      features: [
        '5GB Encrypted Storage',
        'Send up to 100 emails/day',
        'Max attachment size: 10MB',
        'Basic spam protection',
        'Access to Suimail mobile app',
        'Community support',
      ],
      highlighted: false,
      ctaText: 'Get Started',
      icon: Mail,
      color: 'blue',
    },
    {
      name: 'Pro',
      description: 'For professionals and creators',
      monthlyPrice: '0.5 SUI',
      yearlyPrice: '5 SUI',
      yearlyDiscount: 'Save 17%',
      features: [
        '25GB Encrypted Storage',
        'Unlimited emails/day',
        'Max attachment size: 50MB',
        'Advanced spam & phishing protection',
        'Custom @suimail.id domain',
        'Priority support',
        'End-to-end encryption',
        'Schedule emails',
      ],
      highlighted: true,
      ctaText: 'Upgrade Now',
      icon: Zap,
      color: 'blue',
    },
    {
      name: 'Enterprise',
      description: 'For teams and businesses',
      monthlyPrice: '5 SUI',
      yearlyPrice: '10 SUI',
      yearlyDiscount: 'Save 17%',
      features: [
        '100GB Encrypted Storage',
        'Unlimited emails/day',
        'Max attachment size: 1GB',
        'Enterprise-grade security',
        'Custom domain support',
        'Dedicated account manager',
        'End-to-end encryption',
        'Advanced analytics',
        'Team collaboration tools',
        'API access',
      ],
      highlighted: false,
      ctaText: 'Contact Sales',
      icon: Crown,
      color: 'blue',
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {plans.map(plan => (
        <PricingCard key={plan.name} plan={plan} billingCycle={billingCycle} />
      ))}
    </div>
  )
}
