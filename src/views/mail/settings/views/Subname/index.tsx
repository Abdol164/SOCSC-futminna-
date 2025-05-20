import { SubviewHeader } from "../../components/subview-header"
import { FormSection } from "./components/FormSection"

export function SubnameView() {
  return (
    <div>
      <SubviewHeader
        title="Subname Settings"
        description="Manage your subname, including name, description, and image."
      />

      <div className="mt-10">
        <FormSection />
      </div>
    </div>
  )
}
