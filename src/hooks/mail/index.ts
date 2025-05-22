import { useMutation, useQuery } from "@tanstack/react-query"
import { httpService } from "../../api"
import type { IEmail } from "../../types/generic"

export function useFetchInboxQuery() {
  return useQuery({
    queryKey: ["inbox-mails"],
    queryFn: async (): Promise<{ data: IEmail[] }> => {
      return await httpService.get("/mail/inbox/me")
    },
  })
}
export function useFetchDraftsQuery() {
  return useQuery({
    queryKey: ["drafts"],
    queryFn: async (): Promise<{ data: IEmail[] }> => {
      return await httpService.get(`/mail/drafts`)
    },
  })
}

export function useFetchMailBodyQuery(mailId: string) {
  return useQuery({
    queryKey: ["mail-body", mailId],
    queryFn: async (): Promise<IEmail> => {
      return await httpService.get(`/mail/${mailId}`)
    },
  })
}

export function useFetchOutboxQuery() {
  return useQuery({
    queryKey: ["outbox-mails"],
    queryFn: async (): Promise<{ data: IEmail[] }> => {
      return await httpService.get("/mail/outbox/me")
    },
  })
}

export function useFetchTrashQuery() {
  return useQuery({
    queryKey: ["trash"],
    queryFn: async (): Promise<{ data: IEmail[] }> => {
      return await httpService.get(`/mail/trash`)
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
