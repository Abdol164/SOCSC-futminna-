import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Paperclip, Send, X } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormField } from "./FormField"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ReturnRequiredFee } from "./ReturnRequiredFee"
import { useGetUserMailFeeAndAddressQuery } from "@/hooks/user"
import { AxiosError } from "axios"

const formSchema = z.object({
  recipient: z
    .string()
    .regex(
      /^[a-zA-Z0-9]+@suimail$/,
      "Please enter a valid suimail address (e.g. name@suimail)"
    ),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
  attachments: z.array(z.instanceof(File)).optional(),
})

export type ComposeFormData = z.infer<typeof formSchema>

interface OnSubmitValues extends ComposeFormData {
  requiredFee: number
  recipientAddress: string
}

interface FormSectionProps {
  onSubmit: (data: OnSubmitValues) => Promise<void>
  isLoading?: boolean
}

export function FormSection({ onSubmit, isLoading }: FormSectionProps) {
  const [recipientIsSet, setRecipientIsSet] = useState(false)
  const [recipientAddress, setRecipientAddress] = useState<string | null>(null)
  const [recipientError, setRecipientError] = useState<string | null>(null)

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

  const {
    data: mailFeeAndAddressResult,
    isFetching: isFetchingMailFeeAndAddress,
    refetch: refetchMailFeeAndAddress,
    error: mailFeeAndAddressError,
  } = useGetUserMailFeeAndAddressQuery(watch("recipient"), {
    queryKey: ["recipient-mail-fee-and-address", watch("recipient")],
    enabled: false,
  })

  const requiredFee = useMemo(
    () => mailFeeAndAddressResult?.mailFee ?? 0,
    [mailFeeAndAddressResult]
  )

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
      attachments.filter((_, i) => i !== index)
    )
  }

  const handleOnSubmit = (data: ComposeFormData) => {
    if (!recipientAddress) {
      setRecipientError("Recipient not found")
      setTimeout(() => setRecipientError(null), 2000)
      return
    }

    onSubmit({
      ...data,
      requiredFee,
      recipientAddress: recipientAddress ?? "",
    })
  }

  useEffect(() => {
    if (mailFeeAndAddressResult) {
      setRecipientAddress(mailFeeAndAddressResult.address)
      setRecipientIsSet(true)
    }
  }, [mailFeeAndAddressResult, setValue])

  useEffect(() => {
    if (
      mailFeeAndAddressError &&
      mailFeeAndAddressError instanceof AxiosError
    ) {
      const axiosErrorMessage = (
        mailFeeAndAddressError.response?.data as { message: string }
      ).message

      if (axiosErrorMessage === "User not found") {
        setRecipientError("Recipient not found")
        setTimeout(() => setRecipientError(null), 2000)
      } else {
        setRecipientError(axiosErrorMessage)
        setTimeout(() => setRecipientError(null), 2000)
      }
    }
  }, [mailFeeAndAddressError])

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-5">
      <div>
        <FormField
          label="To"
          name="recipient"
          placeholder="e.g. jane@sui.id"
          error={errors.recipient?.message || recipientError}
          register={register}
          required
          disabled={recipientIsSet || isFetchingMailFeeAndAddress}
          readonly={recipientIsSet}
          onBlur={() => {
            if (watch("recipient")) {
              if (/^[a-zA-Z0-9]+@suimail$/.test(watch("recipient"))) {
                setValue("recipient", watch("recipient"), {
                  shouldValidate: true,
                })
                refetchMailFeeAndAddress()
              } else {
                setValue("recipient", watch("recipient"), {
                  shouldValidate: true,
                  shouldTouch: true,
                })
              }
            }
          }}
          extendAction={
            recipientIsSet && (
              <Button
                type="button"
                variant="link"
                className="absolute top-1/2 -translate-y-1/2 right-2"
                onClick={() => {
                  setRecipientIsSet(false)
                  setValue("recipient", "")
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            )
          }
        />
      </div>

      <ReturnRequiredFee
        isFetching={isFetchingMailFeeAndAddress}
        requiredFee={requiredFee}
      />

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
        <Input
          type="file"
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500"
        />
        <div className="flex flex-wrap gap-2">
          {attachments.map((file, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
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
        <Button
          type="submit"
          disabled={isLoading || isFetchingMailFeeAndAddress}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
        >
          <Send className="w-5 h-5" />
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </div>
    </form>
  )
}
