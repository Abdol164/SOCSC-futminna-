import { useMutation } from "@tanstack/react-query"
import { httpService } from "../../api"

export function useLoginMutation() {
  return useMutation({
    mutationFn: async (address: string): Promise<{ access_token: string }> => {
      return await httpService.get(`/auth/login/${address}`)
    },
  })
}
