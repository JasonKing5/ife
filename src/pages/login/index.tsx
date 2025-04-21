import { useLogin, useRegister, useResetPassword } from "@/hooks/useUserQuery"
import { AuthStatus, LoginResponse, RegisterFormValues, ResetPasswordFormValues } from "@/types/user"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { BrainCircuit } from "lucide-react"
import { LoginForm } from "@/components/ui/login-form"
import { loginSchema } from "@/schemas/loginSchema"
import * as z from "zod"
import { RegisterForm } from "@/components/ui/register-form"
import { ResetPasswordForm } from "@/components/ui/reset-password-form"

export type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { setToken, setRefreshToken, setUser, token } = useAuth()
  const [authStatus, setAuthStatus] = useState(AuthStatus.Login)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  const { mutate: loginMutate } = useLogin({
    onSuccess: (data: LoginResponse) => {
      setToken(data.token)
      setRefreshToken(data.refreshToken)
      setUser(data.user)
    },
  })

  const { mutate: resetPasswordMutate } = useResetPassword({
    successMessage: "Reset email sent successfully",
  })

  const { mutate: registerMutate } = useRegister()

  const handleLogin = (data: LoginFormValues) => {
    loginMutate(data)
  }

  const handleRegister = (data: RegisterFormValues) => {
    registerMutate(data)
  }

  const handleResetPassword = (data: ResetPasswordFormValues) => {
    resetPasswordMutate(data)
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
        {authStatus === AuthStatus.Register && (
          <RegisterForm 
            onSubmit={handleRegister}
            onLogin={() => setAuthStatus(AuthStatus.Login)}
          />
        )}
        {authStatus === AuthStatus.Login && (
          <LoginForm 
            // @ts-ignore
            onSubmit={handleLogin} 
            onRegister={() => setAuthStatus(AuthStatus.Register)}
            onReset={() => setAuthStatus(AuthStatus.ResetPassword)}
          />
        )}
        {authStatus === AuthStatus.ResetPassword && (
          <ResetPasswordForm
            // @ts-ignore
            onSubmit={handleResetPassword}
            onLogin={() => setAuthStatus(AuthStatus.Login)}
          />
        )}
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
          By clicking continue, you agree to our <a href="#" className="underline underline-offset-4">Terms of Service</a>{" "}
          and <a href="#" className="underline underline-offset-4">Privacy Policy</a>.
        </div>
      </div>
    </div>
  )
}