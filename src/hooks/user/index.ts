import { httpService } from "@/api"
import {
  useMutation,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query"
import type { AxiosError } from "axios"

export const useGetRecipientSuimailNsQuery = (
  recipient: string,
  options?: UseQueryOptions<string, AxiosError>
) => {
  return useQuery({
    ...(options ?? {}),
    queryKey: ["recipient-suimail-ns", recipient],
    queryFn: async () => {
      return await httpService.get(`/user/suimail-ns/${recipient}`)
    },
  })
}

export const useSetUserMailFeeMutation = () => {
  return useMutation({
    mutationFn: async (mailFee: number) => {
      return await httpService.post("/user/mail-fee", { mailFee })
    },
  })
}
