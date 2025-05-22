import { httpService } from "@/api"
import {
  useMutation,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query"
import type { AxiosError } from "axios"

export const useSetUserSuimailNsMutation = () => {
  return useMutation({
    mutationFn: async (suimailNs: string) => {
      return await httpService.post("/user/suimailns", { suimailNs })
    },
  })
}

export const useGetUserMailFeeAndAddressQuery = (
  recipient: string,
  options?: UseQueryOptions<{ mailFee: number; address: string }, AxiosError>
) => {
  return useQuery({
    ...(options ?? {}),
    queryKey: ["user-mail-fee-and-address", recipient],
    queryFn: async () => {
      const [mailFeeData, addressData] = await Promise.all([
        httpService.get(`/user/${recipient}/mailfee`),
        httpService.get(`/user/${recipient}/address`),
      ])

      return { mailFee: mailFeeData.mailFee, address: addressData.address }
    },
    gcTime: 0,
  })
}

export const useSetUserMailFeeMutation = () => {
  return useMutation({
    mutationFn: async (mailFee: number) => {
      return await httpService.post("/user/mailfee", { mailFee })
    },
  })
}
