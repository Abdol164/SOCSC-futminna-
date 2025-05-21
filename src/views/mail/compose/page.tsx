import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePostSendMailMutation } from "@/hooks/mail"
import { FormSection } from "./components/FormSection"
import { useToastContext } from "@/components/ui/toast"
import { useChargeMailTxFee } from "./utils/charge-mail-tx-fee"

interface ComposeMailValues {
  recipient: string
  recipientAddress: string
  subject: string
  message: string
  attachments?: File[]
  requiredFee: number
}

export default function ComposePage() {
  const navigate = useNavigate()
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
      await sendMail(formData).then(() => {
        setNotification({
          message: "Mail sent successfully",
          type: "success",
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
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
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

      {/* Form */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto p-4">
          <FormSection onSubmit={handleSend} isLoading={isSendingMail} />
        </div>
      </div>
    </div>
  )
}
