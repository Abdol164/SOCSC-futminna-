import {
  useMutation,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query"
import { httpService } from "../../api"
import type { IEmail } from "../../types/generic"
import type { AxiosError } from "axios"

export function useFetchInboxQuery() {
  return useQuery({
    queryKey: ["inbox"],
    queryFn: async (): Promise<IEmail[]> => {
      return await httpService.get("/mail/inbox/me")
    },
  })
}

export function useFetchMailBodyQuery(walletAddress: string, mailId: string) {
  return useQuery({
    queryKey: ["mail-body", walletAddress, mailId],
    queryFn: async (): Promise<IEmail> => {
      return await httpService.get(`/mail/inbox/${mailId}`)
    },
  })
}

export function useFetchOutboxQuery() {
  return useQuery({
    queryKey: ["outbox"],
    queryFn: async (): Promise<IEmail[]> => {
      return await httpService.get("/mail/outbox")
    },
  })
}

interface IPostDraftMail {
  walletAddress: string
  recipient: string
  subject: string
  message: string
  attachments: File[]
}

export function usePostDraftMailMutation() {
  return useMutation({
    mutationFn: async (email: IPostDraftMail) => {
      const formData = new FormData()
      formData.append("from", email.walletAddress)
      formData.append("to", email.recipient)
      formData.append("subject", email.subject)
      formData.append("message", email.message)
      email.attachments.forEach((file) => formData.append("attachments", file))
      return await httpService.post("/mail/saveDraft", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    },
  })
}

export function useGetMailFeeQuery(
  recipient: string,
  options?: UseQueryOptions<number, AxiosError>
) {
  return useQuery({
    ...(options ?? {}),
    queryKey: ["mail-fee", recipient],
    queryFn: async () => {
      return await httpService.get(`/mail/fee/${recipient}`)
    },
  })
}

export function usePostSendMailMutation() {
  return useMutation({
    mutationFn: async (emailContent: FormData) => {
      return await httpService.post("/mail/send", emailContent, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    },
  })
}
