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
  error?: string | null
  required?: boolean
  register: UseFormRegister<ComposeFormData>
  rows?: number
  disabled?: boolean
  readonly?: boolean
  extendAction?: React.ReactNode
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
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
  disabled,
  readonly,
  extendAction,
  onBlur,
}: FormFieldProps) => {
  const commonProps = {
    placeholder,
    ...register(name, {
      onBlur: (e) => {
        if (onBlur) {
          onBlur(e)
        }
      }
    }),
    required,
    disabled,
    readOnly: readonly,
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>

      <div className="relative">
        {type === "textarea" ? (
          <Textarea id={name} rows={rows} {...commonProps} />
        ) : (
          <Input id={name} type={type} {...commonProps} />
        )}
        {extendAction && extendAction}
      </div>
      {error && <span className="text-xs text-red-500/80">{error}</span>}
    </div>
  )
}
