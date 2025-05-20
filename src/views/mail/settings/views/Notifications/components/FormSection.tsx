import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function FormSection() {
  return (
    <form>
      <div className="grid grid-cols-1 gap-4 max-w-md">
        {/* Receive Notifications Switch */}
        <div className="w-full rounded-md border border-input p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1">
                <Label htmlFor="receive-notifications">
                  Receive Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for new messages, replies, and mentions.
                </p>
              </div>
              <Switch id="receive-notifications" />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
