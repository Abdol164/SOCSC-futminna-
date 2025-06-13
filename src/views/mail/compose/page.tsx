import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { usePostSendMailMutation } from '@/hooks/mail'
import { FormSection } from './components/FormSection'
import { useToastContext } from '@/components/ui/toast'
import { useCreateEscrowTx } from './utils/create-escrow-tx'
import { MailBoardPageLayout } from '@/components/layouts/MailBoardPageLayout'
import { DefaultPagePadding } from '@/components/layouts/DefaultPagePadding'

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

  const { createEscrowTx } = useCreateEscrowTx()
  const { mutateAsync: sendMail, isPending: isSendingMail } =
    usePostSendMailMutation()

  const handleSend = async (data: ComposeMailValues) => {
    try {
      let createEscrowTxDigest = ''

      if (data.requiredFee > 0) {
        createEscrowTxDigest = await createEscrowTx(
          data.requiredFee,
          data.recipientAddress
        )

        if (createEscrowTxDigest === 'false') {
          setNotification({
            message: 'Failed to charge mail Transaction Fee',
            type: 'error',
          })
          return
        }
      }

      const formData = new FormData()
      formData.append('recipient', data.recipient)
      formData.append('subject', data.subject)
      formData.append('body', data.message)

      if (createEscrowTxDigest.length > 0 && createEscrowTxDigest !== 'false') {
        formData.append('digest', createEscrowTxDigest)
      }

      data.attachments?.forEach(file => formData.append('attachments', file))

      sendMail(formData).then(async () => {
        setNotification({
          message: 'Mail sent successfully',
          type: 'success',
        })
        await queryClient.invalidateQueries({
          queryKey: ['outbox-mails'],
        })
        navigate('/mail/sent')
      })
    } catch {
      setNotification({
        message: 'Failed to send mail',
        type: 'error',
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

      <DefaultPagePadding>
        <MailBoardPageLayout>
          <div className="max-w-xl mx-auto">
            <FormSection onSubmit={handleSend} isLoading={isSendingMail} />
          </div>
        </MailBoardPageLayout>
      </DefaultPagePadding>
    </div>
  )
}
