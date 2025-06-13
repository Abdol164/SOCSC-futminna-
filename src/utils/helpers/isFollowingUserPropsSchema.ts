import type { UserProps } from '@/types/Authentication'

export const isFollowingUserPropsSchema = (obj: unknown): obj is UserProps => {
  return (
    typeof (obj as UserProps).firstName === 'string' &&
    typeof (obj as UserProps).lastName === 'string' &&
    typeof (obj as UserProps).email === 'string' &&
    typeof (obj as UserProps).role === 'string' &&
    typeof (obj as UserProps).picture === 'string'
  )
}
