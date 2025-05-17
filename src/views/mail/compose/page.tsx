import { FormSection } from "./components/FormSection"
import { useChargeMailTxFee } from "./utils/charge-mail-tx-fee"
import { usePostSendMailMutation } from "@/hooks/mail"

interface ComposeMailValues {
  recipient: string
  subject: string
  message: string
  attachments?: File[]
  requiredFee: number
}

export default function ComposePage() {
  const isDrawer = true
  const { chargeMailTxFee } = useChargeMailTxFee()
  const { mutateAsync: sendMail, isPending: isSendingMail } =
    usePostSendMailMutation()

  const handleSend = async (data: ComposeMailValues) => {
    const chargeMailTxFeeResult = await chargeMailTxFee(
      data.requiredFee,
      data.recipient
    )

    if (!chargeMailTxFeeResult) {
      return
    }

    try {
      const formData = new FormData()
      formData.append("to", data.recipient)
      formData.append("subject", data.subject)
      formData.append("message", data.message)
      data.attachments?.forEach((file) => formData.append("attachments", file))
      const res = await sendMail(formData)
      console.log(res)
    } catch (error) {
      console.error("Error sending mail:", error)
    }
  }

  return (
    <div
      className={`${
        isDrawer
          ? "bg-white p-4"
          : "min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center py-10 px-4"
      }`}
    >
      <div
        className={`w-full ${
          isDrawer ? "" : "max-w-3xl shadow-xl"
        } bg-white rounded-xl ${isDrawer ? "" : "p-6 md:p-10"} space-y-6`}
      >
        {!isDrawer && (
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            New Message
          </h2>
        )}

        <FormSection onSubmit={handleSend} isLoading={isSendingMail} />
      </div>
    </div>
  )
}
