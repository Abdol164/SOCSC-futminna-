import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ConnectModal, useCurrentAccount } from '@mysten/dapp-kit'
import { useState } from 'react'

export function AccountNotFoundCard() {
  const [isOpen, setIsOpen] = useState(false)
  const currentAccount = useCurrentAccount()

  return (
    <Card className="flex flex-col items-center justify-center h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Account Not Found</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Please connect your wallet to view your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ConnectModal
          open={isOpen}
          onOpenChange={() => setIsOpen(false)}
          trigger={
            <Button disabled={!!currentAccount}>
              {currentAccount ? 'Connected' : 'Connect Wallet'}
            </Button>
          }
        />
      </CardContent>
    </Card>
  )
}
