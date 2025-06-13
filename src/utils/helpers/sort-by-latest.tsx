import type { IEmail } from '@/types/generic'

export function sortEmailsByLatest(emails: IEmail[]) {
  return emails.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}
