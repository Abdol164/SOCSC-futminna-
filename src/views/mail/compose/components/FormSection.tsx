"use client"

import type React from "react"

import { useMemo } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Paperclip, Send, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormField } from "./FormField"
import { isValidSuiAddress } from "@mysten/sui/utils"
import { useGetMailFeeQuery } from "@/hooks/mail"
import { useGetRecipientSuimailNsQuery } from "@/hooks/user"
import { ReturnRequiredFee } from "./ReturnRequiredFee"

const formSchema = z.object({
  recipient: z.string().email("Please enter a valid address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
  attachments: z.array(z.instanceof(File)).optional(),
})

export type ComposeFormData = z.infer<typeof formSchema>

interface OnSubmitValues extends ComposeFormData {
  requiredFee: number
}

interface FormSectionProps {
  onSubmit: (data: OnSubmitValues) => Promise<void>
  isLoading?: boolean
}

export function FormSection({ onSubmit, isLoading = false }: FormSectionProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ComposeFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipient: "",
      subject: "",
      message: "",
      attachments: [],
    },
  })

  const { data: suimailNs, isFetching: isFetchingSuimailNs } = useGetRecipientSuimailNsQuery(watch("recipient"), {
    queryKey: ["recipient-suimail-ns", watch("recipient")],
    enabled: isValidSuiAddress(watch("recipient")),
  })

  const { data: mailFee, isFetching: isFetchingMailFee } = useGetMailFeeQuery(watch("recipient"), {
    queryKey: ["mail-fee", watch("recipient")],
    enabled: isValidSuiAddress(watch("recipient")),
  })

  const requiredFee = useMemo(() => mailFee ?? 0, [mailFee])

  const attachments = watch("attachments") || []

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setValue("attachments", [...attachments, ...newFiles])
    }
  }

  const removeAttachment = (index: number) => {
    setValue(
      "attachments",
      attachments.filter((_, i) => i !== index),
    )
  }

  const handleOnSubmit = (data: ComposeFormData) => {
    onSubmit({
      ...data,
      requiredFee: requiredFee,
    })
  }

  const isFetching = isFetchingSuimailNs || isFetchingMailFee

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-5">
      <FormField
        label="To"
        name="recipient"
        placeholder="e.g. jane@sui.id"
        error={errors.recipient?.message}
        register={register}
        required
      />
      <ReturnRequiredFee isFetching={isFetchingMailFee} requiredFee={requiredFee} />

      <FormField
        label="Subject"
        name="subject"
        placeholder="What's this about?"
        error={errors.subject?.message}
        register={register}
        required
      />

      <FormField
        label="Message"
        name="message"
        type="textarea"
        placeholder="Write your message here..."
        error={errors.message?.message}
        register={register}
        required
        rows={12}
      />

      <div className="space-y-2">
        <Label>Attachments</Label>
        <Input type="file" multiple onChange={handleFileChange} className="block w-full text-sm text-gray-500" />
        <div className="flex flex-wrap gap-2">
          {attachments.map((file, index) => (
            <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
              <Paperclip className="w-4 h-4 mr-1" />
              {file.name}
              <button
                type="button"
                onClick={() => removeAttachment(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="submit"
          disabled={isLoading || isFetching}
          className={`flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Send className="w-5 h-5" />
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  )
}
