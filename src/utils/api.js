const API_BASE_URL = "https://api.coingecko.com/api/v3"

export async function fetchTopCryptos(count = 10) {
  const response = await fetch(
    `${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${count}&page=1&sparkline=true`,
  )
  if (!response.ok) {
    throw new Error("Failed to fetch crypto data")
  }
  return response.json()
}

export function simulatePriceChange(price) {
  const changePercent = (Math.random() - 0.5) * 0.2 // -0.1% to +0.1%
  return price * (1 + changePercent)
}

