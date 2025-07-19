import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: true,
      staleTime: Infinity,
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
})
