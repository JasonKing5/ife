import { useLogin, useRegister } from "@/hooks/useUserQuery"
import { LoginResponse, RegisterFormValues } from "@/types/user"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { BrainCircuit } from "lucide-react"
import { LoginForm } from "@/components/ui/login-form"
import { loginSchema } from "@/schemas/loginSchema"
import * as z from "zod"
import { RegisterForm } from "@/components/ui/register-form"

export type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { setToken, setUser, token } = useAuth()
  const [isRegister, setIsRegister] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  const { mutate: loginMutate } = useLogin({
    onSuccess: (data: LoginResponse) => {
      setToken(data.token)
      setUser(data.user)
    },
  })

  const { mutate: registerMutate } = useRegister()

  const handleLogin = (data: LoginFormValues) => {
    loginMutate(data)
  }

  const handleRegister = (data: RegisterFormValues) => {
    registerMutate(data)
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
        {isRegister ? (
          <RegisterForm 
            onSubmit={handleRegister}
            onLogin={() => setIsRegister(false)}
          />
        ) : (
          <LoginForm 
            // @ts-ignore
            onSubmit={handleLogin} 
            onRegister={() => setIsRegister(true)}
          />
        )}
      </div>
    </div>
  )
}