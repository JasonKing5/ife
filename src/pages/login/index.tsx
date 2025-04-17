import { useLogin } from "@/hooks/useUserQuery"
import { LoginResponse } from "@/types/user"
import { useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { BrainCircuit } from "lucide-react"
import { LoginForm } from "@/components/ui/login-form"
import { loginSchema } from "@/schemas/loginSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

export type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { setToken, setUser, token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  const { mutate: login } = useLogin({
    onSuccess: (data: LoginResponse) => {
      setToken(data.token)
      setUser(data.user)
    },
  })

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = (values: LoginFormValues) => {
    login({ email: values.email, password: values.password })
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
        <LoginForm
          form={form}
          // @ts-ignore
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}