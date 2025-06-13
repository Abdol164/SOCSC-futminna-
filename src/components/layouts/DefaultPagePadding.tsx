import { cn } from '@/lib/utils'

export function DefaultPagePadding({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('relative pt-20 min-h-screen', className)}>
      {children}
    </div>
  )
}
