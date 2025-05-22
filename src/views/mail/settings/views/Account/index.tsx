import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSetUserMailFeeMutation } from "@/hooks/user"
import { SubviewHeader } from "../../components/subview-header"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { useToastContext } from "@/components/ui/toast"

const formSchema = z.object({
  mailFee: z
    .number()
    .min(0, "Mail fee must be at least 0")
    .max(0.1, "Mail fee cannot exceed 0.1"),
})

type FormData = z.infer<typeof formSchema>

export function AccountView() {
  const { setNotification } = useToastContext()

  const { mutateAsync: setUserMailFee, isPending } = useSetUserMailFeeMutation()

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mailFee: 0,
    },
  })

  const mailFee = watch("mailFee")

  const handleSetMailFee = async (data: FormData) => {
    try {
      await setUserMailFee(data.mailFee)
      setNotification({
        message: `Successfully set mail fee to ${data.mailFee} SUI`,
        type: "success",
      })
    } catch {
      setNotification({
        message: "Failed to update mail fee. Please try again.",
        type: "error",
      })
    }
  }

  return (
    <div>
      <SubviewHeader
        title="Account Settings"
        description="Manage your personal info, wallet, and linked accounts."
      />

      <form onSubmit={handleSubmit(handleSetMailFee)} className="mt-10">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Set SUI Amount Per Mail</CardTitle>
            <CardDescription>
              Choose how much SUI you want to charge per mail. You can set any
              value between 0 and 0.1 SUI.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Slider
              min={0}
              max={0.1}
              step={0.01}
              value={[mailFee]}
              onValueChange={([val]) =>
                setValue("mailFee", val, { shouldValidate: true })
              }
              className="w-full"
              id="mailFee"
            />
            <div className="flex items-center justify-between">
              <Label htmlFor="mailFee" className="text-base font-medium">
                Selected Amount
              </Label>
              <span className="font-semibold text-primary">{mailFee} SUI</span>
            </div>
            {errors.mailFee && (
              <p className="text-sm text-red-500">{errors.mailFee.message}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full hover:bg-blue-600"
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Done"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
