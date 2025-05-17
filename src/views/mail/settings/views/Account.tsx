import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSetUserMailFeeMutation } from "@/hooks/user"

const formSchema = z.object({
  mailFee: z.number()
    .min(0, "Mail fee must be at least 0")
    .max(0.1, "Mail fee cannot exceed 0.1")
})

type FormData = z.infer<typeof formSchema>

export function AccountView() {
  const { mutateAsync: setUserMailFee } = useSetUserMailFeeMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mailFee: 0
    }
  })

  const mailFee = watch("mailFee")

  const handleSetMailFee = async (data: FormData) => {
    try {
      await setUserMailFee(data.mailFee)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
      <p className="text-gray-500 mb-4">
        Manage your personal info, wallet, and linked accounts.
      </p>
      <form onSubmit={handleSubmit(handleSetMailFee)}>
        <div>
          <h3 className="text-lg font-medium mb-2">Set SUI Amount Per Mail</h3>
          <div className="flex flex-col gap-4">
            <input
              type="range"
              min="0"
              max="0.1"
              step="0.01"
              {...register("mailFee", { valueAsNumber: true })}
              className="w-full"
            />
            <p className="text-gray-700">
              Selected Amount: <span id="selectedAmount">{mailFee}</span> SUI
            </p>
            {errors.mailFee && (
              <p className="text-sm text-red-500">{errors.mailFee.message}</p>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Done
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
