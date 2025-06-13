import { SubviewHeader } from '../../components/subview-header'
import { FormSection } from './components/FormSection'

export function NotificationsView() {
  return (
    <div>
      <SubviewHeader
        title="Notification Settings"
        description="Manage your notification settings."
      />

      <div className="mt-10">
        <FormSection />
      </div>
    </div>
  )
}
