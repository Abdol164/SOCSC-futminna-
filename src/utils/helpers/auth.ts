export function setCookie(
  key: string,
  value: string,
  expires: Date = new Date(Date.now() + 1000 * 60 * 60 * 5) // 5 hours
) {
  document.cookie = `${key}=${value}; path=/; secure; samesite=strict; expires=${expires.toUTCString()}`
}

export function getCookie(key: string) {
  const name = key + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}
