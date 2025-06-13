import type { IEmail } from '@/types/generic'
import { createContext, useContext, useMemo, useState } from 'react'

export const EmailListContext = createContext<{
  selectedEmails: IEmail[]
  setSelectedEmails: (emails: IEmail[]) => void
  hasSelectedEmails: boolean
}>({
  selectedEmails: [],
  setSelectedEmails: () => {},
  hasSelectedEmails: false,
})

export function EmailListProvider({ children }: { children: React.ReactNode }) {
  const [selectedEmails, setSelectedEmails] = useState<IEmail[]>([])

  const hasSelectedEmails = useMemo(() => {
    return selectedEmails.length > 0
  }, [selectedEmails])

  const contextValue = useMemo(
    () => ({
      selectedEmails,
      setSelectedEmails,
      hasSelectedEmails,
    }),
    [selectedEmails, setSelectedEmails, hasSelectedEmails]
  )

  return (
    <EmailListContext.Provider value={contextValue}>
      {children}
    </EmailListContext.Provider>
  )
}

export const useEmailListContext = () => {
  const context = useContext(EmailListContext)

  if (!context) {
    throw new Error(
      'useEmailListContext must be used within an EmailListProvider'
    )
  }

  return context
}
