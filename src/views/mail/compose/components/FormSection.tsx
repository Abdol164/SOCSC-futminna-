import type React from "react"
import { useEffect, useMemo, useState } from "react"
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
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  recipient: z
    .string()
    .regex(
      /^[a-zA-Z0-9]+@suimail$/,
      "Please enter a valid suimail address (e.g. name@suimail)"
    ),
  recipientWalletAddress: z
    .string()
    .refine(isValidSuiAddress, "Please enter a valid Sui address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
  attachments: z.array(z.instanceof(File)).optional(),
})

export type ComposeFormData = z.infer<typeof formSchema>

interface OnSubmitValues extends ComposeFormData {
  recipientAddress: string
  requiredFee: number
}

interface FormSectionProps {
  onSubmit: (data: OnSubmitValues) => Promise<void>
  isLoading?: boolean
}

export function FormSection({ onSubmit, isLoading }: FormSectionProps) {
  const [recipientIsSet, setRecipientIsSet] = useState(false)

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
      recipientWalletAddress: "",
      subject: "",
      message: "",
      attachments: [],
    },
  })

  const { data: suimailNsResult, isFetching: isFetchingSuimailNs } =
    useGetRecipientSuimailNsQuery(watch("recipientWalletAddress"), {
      queryKey: ["recipient-suimail-ns", watch("recipientWalletAddress")],
      enabled: isValidSuiAddress(watch("recipientWalletAddress")),
    })

  const { data: mailFeeResult, isFetching: isFetchingMailFee } =
    useGetMailFeeQuery(watch("recipientWalletAddress"), {
      queryKey: ["mail-fee", watch("recipientWalletAddress")],
      enabled: isValidSuiAddress(watch("recipientWalletAddress")),
    })

  const requiredFee = useMemo(
    () => mailFeeResult?.mailFee ?? 0,
    [mailFeeResult]
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
    console.log(data)

    onSubmit({
      ...data,
      requiredFee,
      recipientAddress: watch("recipientWalletAddress"),
    })
  }

  useEffect(() => {
    if (suimailNsResult?.suimailNs) {
      setValue("recipient", suimailNsResult.suimailNs)
      setRecipientIsSet(true)
    }
  }, [suimailNsResult, setValue])

  const isFetching = isFetchingSuimailNs || isFetchingMailFee

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-5">
      {/* If the suimailNsResult is present show the suimailNs field */}
      {recipientIsSet && (
        <div>
          <FormField
            label="To"
            name="recipient"
            placeholder="e.g. jane@sui.id"
            error={errors.recipient?.message}
            register={register}
            required
            disabled={isFetching}
            readonly
            extendAction={
              <Button
                type="button"
                variant="link"
                className="absolute top-1/2 -translate-y-1/2 right-2"
                onClick={() => setRecipientIsSet(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            }
          />
        </div>
      )}
      {/* If the suimailNsResult is not present show the recipientWalletAddress field */}
      {!recipientIsSet && (
        <FormField
          label="To"
          name="recipientWalletAddress"
          placeholder="e.g. some wallet address"
          error={errors.recipientWalletAddress?.message}
          register={register}
          required
          disabled={isFetching}
        />
      )}
      <ReturnRequiredFee
        isFetching={isFetchingMailFee}
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
          disabled={isLoading || isFetching}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
        >
          <Send className="w-5 h-5" />
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </div>
    </form>
  )
}
