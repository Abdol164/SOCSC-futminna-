import { httpService } from '@/api'
import { useQuery } from '@tanstack/react-query'

export function useGetSuiStats() {
  return useQuery({
    queryKey: ['sui-usd-price'],
    queryFn: async (): Promise<{
      stats: {
        price: number
        timestamp: number
      }
    }> => {
      return await httpService.get('/stats/sui')
    },
    gcTime: 20 * 60 * 1000, // 20 minutes
  })
}
