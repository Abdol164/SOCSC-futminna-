import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Trash2,
  Reply,
  Forward,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { format } from 'date-fns'
import { Loading } from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { useFetchMailBodyQuery } from '@/hooks/mail'
import { useSuiClientQuery } from '@mysten/dapp-kit'
import MailNotFound from '@/components/MailNotFound'
import { SimpleAvatar } from '@/components/ui/SimpleAvatar'
import { useClaimEscrowTx } from '../../hooks/ptb/claim-escrow-tx'

export default function EmailView() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [txDigest, setTxDigest] = useState<string>('')

  const { claimEscrowTx } = useClaimEscrowTx()

  const { data: mail, isFetching } = useFetchMailBodyQuery(id ?? '')

  const { data } = useSuiClientQuery('getTransactionBlock', {
    digest: txDigest,
    options: { showObjectChanges: true },
  })

  const firstCreatedObjectId = useMemo(
    () =>
      data?.objectChanges?.find(change => change.type === 'created')?.objectId,
    [data?.objectChanges]
  )

  useEffect(() => {
    if (mail?.digest) {
      setTxDigest(mail.digest)
    }
  }, [mail, firstCreatedObjectId])

  if (isFetching) return <Loading message="Loading email..." />

  if (!mail) return <MailNotFound />

  const handleClaimSui = async () => {
    console.log('Claiming Sui...')
    if (firstCreatedObjectId) {
      console.log('objectId present')
      claimEscrowTx(firstCreatedObjectId)
    }
  }

  return (
    <div className="h-full w-full relative">
      <div className="absolute inset-0 bg-white border-l border-gray-200 shadow-md z-20 overflow-hidden">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                className="mr-4 p-2 hover:bg-gray-100 transition-colors"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>
              <h2 className="text-lg font-medium text-gray-900 truncate">
                {mail.subject}
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>

              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center px-4 pb-4 space-x-2">
            <button className="flex items-center px-3 py-1.5 rounded-md bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors">
              <Reply className="h-4 w-4 mr-2" />
              Reply
            </button>
            <button className="flex items-center px-3 py-1.5 rounded-md border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">
              <Forward className="h-4 w-4 mr-2" />
              Forward
            </button>
            <button
              onClick={handleClaimSui}
              className="flex items-center px-3 py-1.5 rounded-md bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Claim Sui
            </button>

            <div className="flex-1"></div>

            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Trash2 className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div
          className="p-6 overflow-y-auto"
          style={{ height: 'calc(100vh - 140px)' }}
        >
          <div className="flex items-start mb-6">
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {mail.sender.suimailNs}
                  </h3>
                  <p className="text-sm text-gray-500">
                    To: {mail.recipient.suimailNs}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {format(new Date(mail.createdAt), 'PPP')}
                  </p>
                  <p className="text-xs text-gray-400">
                    {format(new Date(mail.createdAt), 'p')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Subject */}
          <h1 className="text-2xl font-bold mb-6 text-gray-900">
            {mail.subject}
          </h1>

          {/* Email body */}
          <div className="prose max-w-none">
            {mail.body.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Quick reply */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-4">
            <SimpleAvatar initials="ME" size="sm" />
            <div className="flex-1 rounded-md border border-gray-300 px-4 py-2 bg-white focus-within:ring-1 focus-within:ring-blue-500 transition-all">
              <input
                type="text"
                placeholder="Reply to this mail..."
                className="w-full bg-transparent border-none focus:outline-none text-sm"
              />
            </div>
            <button className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors">
              <Reply className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
