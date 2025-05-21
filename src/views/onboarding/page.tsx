import { useState } from "react"
import { motion } from "motion/react"
import { useQueryClient } from "@tanstack/react-query"
import { FormSection } from "./components/FormSection"
import { useToastContext } from "@/components/ui/toast"
import { useSetUserSuimailNsMutation } from "@/hooks/user"
import { MailBoardPageLayout } from "@/components/layouts/MailBoardPageLayout"
import { ConfirmSuimailNSModal } from "./components/ConfirmSuimailNSModal"

export default function OnboardingPage() {
  const queryClient = useQueryClient()
  const [suimailNS, setSuimailNS] = useState("")

  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const { setNotification } = useToastContext()

  const { mutateAsync: setUserSuimailNs, isPending: isSettingUpSuimailNs } =
    useSetUserSuimailNsMutation()

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email)
    setNotification({
      message: "Email address copied to clipboard",
      type: "success",
    })
  }

  const handleOnSendBeforeSubmit = async ({
    suimailNS,
  }: {
    suimailNS: string
  }) => {
    if (
      !suimailNS.length ||
      !suimailNS.match(/.*@suimail$/) ||
      !suimailNS.split("@")[0].match(/^[a-zA-Z0-9][a-zA-Z0-9.]*[a-zA-Z0-9]$/) ||
      suimailNS.split("@")[0].length < 3 ||
      suimailNS.split("@")[0].length > 20
    ) {
      setNotification({
        message: "Invalid SuiMail NS",
        description:
          "Please enter a valid SuiMail NS. It must be between 3 and 20 characters and contain only alphanumeric characters.",
        type: "error",
      })
      return
    }

    setShowConfirmDialog(true)
    setSuimailNS(suimailNS)
  }

  const handleSubmit = async () => {
    if (
      !suimailNS.length ||
      !suimailNS.match(/.*@suimail$/) ||
      !suimailNS.split("@")[0].match(/^[a-zA-Z0-9][a-zA-Z0-9.]*[a-zA-Z0-9]$/) ||
      suimailNS.split("@")[0].length < 3 ||
      suimailNS.split("@")[0].length > 20
    ) {
      setNotification({
        message: "Invalid SuiMail NS",
        description:
          "Please enter a valid SuiMail NS. It must be between 3 and 20 characters and contain only alphanumeric characters.",
        type: "error",
      })
      return
    }

    try {
      await setUserSuimailNs(suimailNS).then(async () => {
        setNotification({
          message: "Onboarded Successfully 🎉",
          type: "success",
        })
        await queryClient.invalidateQueries({
          queryKey: ["auth-user"],
        })
      })
    } catch (error) {
      console.error(error)
      setNotification({
        message: "Failed to Onboard",
        type: "error",
      })
    }
  }

  return (
    <MailBoardPageLayout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4 py-0 sm:py-4">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 100,
              }}
              className="inline-flex items-center justify-center mb-4"
            >
              <div className="relative">
                <img
                  src="/images/suimail-logo.png"
                  alt="Suimail"
                  className="w-[150px] h-auto"
                />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground"
            >
              Your Decentralized Email on the Sui Blockchain
            </motion.p>
          </div>

          <FormSection
            handleSubmit={handleOnSendBeforeSubmit}
            isSettingUpSuimailNs={isSettingUpSuimailNs}
            copyToClipboard={copyToClipboard}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-muted-foreground mt-4"
          >
            By continuing, you agree to our{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-20 right-[20%] w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-20 left-[20%] w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"
        />
      </div>

      <ConfirmSuimailNSModal
        showConfirmDialog={showConfirmDialog}
        setShowConfirmDialog={setShowConfirmDialog}
        suimailNS={suimailNS}
        handleOnConfirmSubmit={handleSubmit}
      />
    </MailBoardPageLayout>
  )
}
