import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToastContext } from "@/components/ui/toast"
import { useEffect, useState } from "react"

export function FormSection() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState(
    Notification.permission
  )

  const { setNotification } = useToastContext()

  useEffect(() => {
    if ("Notification" in window) {
      setPermissionStatus(Notification.permission)

      if (Notification.permission === "granted") {
        setNotificationsEnabled(true)
      }
    }
  }, [])

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      setNotification({
        message: "This browser does not support notifications",
        type: "error",
      })
      return false
    }

    if (Notification.permission === "granted") {
      return true
    }

    const permission = await Notification.requestPermission()
    setPermissionStatus(permission)

    if (permission === "granted") {
      new Notification("Notifications Enabled!", {
        body: "You will now receive notifications for new emails and updates.",
      })
      return true
    } else {
      setNotification({
        message: "Notification permission was denied",
        type: "error",
      })
      return false
    }
  }

  const handleSwitchChange = async (checked: boolean) => {
    if (checked) {
      // Request permission when enabling notifications
      const granted = await requestNotificationPermission()
      if (granted) {
        setNotificationsEnabled(true)
        // Here you would typically save this preference to your backend/state management
        console.log("Notifications enabled for user")
      } else {
        // Keep switch off if permission wasn't granted
        setNotificationsEnabled(false)
      }
    } else {
      // Disable notifications
      setNotificationsEnabled(false)
      console.log("Notifications disabled for user")
      // Here you would typically save this preference to your backend/state management
    }
  }

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
              <Switch
                id="receive-notifications"
                checked={notificationsEnabled}
                onCheckedChange={handleSwitchChange}
                disabled={
                  !("Notification" in window) || permissionStatus === "denied"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
