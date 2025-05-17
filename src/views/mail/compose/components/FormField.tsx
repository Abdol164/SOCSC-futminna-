import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { UseFormRegister } from "react-hook-form"
import type { ComposeFormData } from "./FormSection"

interface FormFieldProps {
  label: string
  name: keyof ComposeFormData
  type?: string
  placeholder?: string
  error?: string
  required?: boolean
  register: UseFormRegister<ComposeFormData>
  rows?: number
}

export const FormField = ({
  label,
  name,
  type = "text",
  placeholder,
  error,
  required,
  register,
  rows,
}: FormFieldProps) => {
  const commonProps = {
    placeholder,
    ...register(name),
    required,
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      {type === "textarea" ? (
        <Textarea id={name} rows={rows} {...commonProps} />
      ) : (
        <Input id={name} type={type} {...commonProps} />
      )}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}
