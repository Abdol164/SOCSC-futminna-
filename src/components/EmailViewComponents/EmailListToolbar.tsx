import { Button } from '../ui/button'
import { MailOpen, RefreshCw, Trash2 } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

interface EmailListToolbarProps {
  handleSelectAllEmails: (checked: boolean) => void
  hasSelectedEmails: boolean
  refetch?: () => void

  handleMarkSelectedEmailsAsRead: () => void
  handleDeleteSelectedEmails: () => void
}

export function EmailListToolbar({
  refetch,
  hasSelectedEmails,
  handleSelectAllEmails,
  handleDeleteSelectedEmails,
  handleMarkSelectedEmailsAsRead,
}: EmailListToolbarProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox onCheckedChange={handleSelectAllEmails} />

      {hasSelectedEmails ? (
        <div className="flex items-center gap-2 pl-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleMarkSelectedEmailsAsRead}
              >
                <MailOpen className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mark as read</p>
            </TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-5 w-px bg-black/20" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDeleteSelectedEmails}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-red-400 text-white">
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </div>
      ) : (
        <>
          {refetch && (
            <Button variant="ghost" size="icon" onClick={refetch}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}
        </>
      )}
    </div>
  )
}
