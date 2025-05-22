import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePostSendMailMutation } from "@/hooks/mail"
import { FormSection } from "./components/FormSection"
import { useToastContext } from "@/components/ui/toast"
import { useChargeMailTxFee } from "./utils/charge-mail-tx-fee"
import { MailBoardPageLayout } from "@/components/layouts/MailBoardPageLayout"
import { useQueryClient } from "@tanstack/react-query"

interface ComposeMailValues {
  recipient: string
  subject: string
  message: string
  attachments?: File[]
  requiredFee: number
  recipientAddress: string
}

export default function ComposePage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { setNotification } = useToastContext()
  const { chargeMailTxFee } = useChargeMailTxFee()
  const { mutateAsync: sendMail, isPending: isSendingMail } =
    usePostSendMailMutation()

  const handleSend = async (data: ComposeMailValues) => {
    const chargeMailTxFeeResult = await chargeMailTxFee(
      data.requiredFee,
      data.recipientAddress
    )

    if (!chargeMailTxFeeResult) {
      setNotification({
        message: "Failed to charge mail Transaction Fee",
        type: "error",
      })
      return
    }

    try {
      const formData = new FormData()
      formData.append("recipient", data.recipient)
      formData.append("subject", data.subject)
      formData.append("body", data.message)
      data.attachments?.forEach((file) => formData.append("attachments", file))
      sendMail(formData).then(async () => {
        setNotification({
          message: "Mail sent successfully",
          type: "success",
        })
        await queryClient.invalidateQueries({
          queryKey: ["outbox-mails"],
        })
        navigate("/mail/sent")
      })
    } catch {
      setNotification({
        message: "Failed to send mail",
        type: "error",
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4 text-gray-600" />
          </Button>
          <h1 className="text-lg font-medium">New Message</h1>
        </div>
      </div>

      <MailBoardPageLayout>
        <div className="flex-1 mt-10">
          <div className="max-w-xl mx-auto">
            <FormSection onSubmit={handleSend} isLoading={isSendingMail} />
          </div>
        </div>
      </MailBoardPageLayout>
    </div>
  )
}
