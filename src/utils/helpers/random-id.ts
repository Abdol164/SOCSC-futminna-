export const randomId = (length: number = 15) => {
  return Math.random().toString(36).substring(2, length)
}
