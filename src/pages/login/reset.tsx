import { useUpdatePassword } from "@/hooks/useUserQuery"
import { UpdatePasswordFormValues } from "@/types/user"
import { useNavigate } from "react-router-dom"
import { BrainCircuit } from "lucide-react"
import { UpdatePasswordForm } from "@/components/ui/update-password-form"

export default function ResetPasswordPage() {
  const navigate = useNavigate()

  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get("token") ?? ''

  const { mutate: updatePasswordMutate } = useUpdatePassword({
    successMessage: "Password updated successfully",
    onSuccess: () => navigate("/login"),
  })

  const handleUpdatePassword = (data: UpdatePasswordFormValues) => {
    updatePasswordMutate({
      ...data,
      token,
    })
  }

  return (
    <div className="flex min-h-svh min-w-svw flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BrainCircuit className="size-4" />
          </div>
          Auto Job AI
        </a>
        <UpdatePasswordForm
          // @ts-ignore
          onSubmit={handleUpdatePassword}
          onLogin={() => navigate("/login")}
        />
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
          By clicking continue, you agree to our <a href="#" className="underline underline-offset-4">Terms of Service</a>{" "}
          and <a href="#" className="underline underline-offset-4">Privacy Policy</a>.
        </div>
      </div>
    </div>
  )
}