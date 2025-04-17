import { useRegister, useLogin } from "@/hooks/useUserQuery"
import { RegisterRequest, LoginResponse } from "@/types/user"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { BrainCircuit } from "lucide-react"
import { LoginForm } from "@/components/ui/login-form"

const defaultUser: RegisterRequest = {
  username: "",
  email: "root@example.com",
  password: "123456",
  role: "user"
}

export default function LoginPage() {
  const { setToken, setUser, token } = useAuth()
  const navigate = useNavigate()
  const [loginUser, setLoginUser] = useState<RegisterRequest>(defaultUser)
  const { mutate } = useRegister()

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

  const handleLogin = () => {
    if (!loginUser || !loginUser.email || !loginUser.password) {
      return
    }
    login({ email: loginUser.email, password: loginUser.password })
  }

  const handleRegister = () => {
    if (!loginUser) return
    mutate({ username: loginUser.username, email: loginUser.email, password: loginUser.password, role: loginUser.role })
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
          loginUser={loginUser}
          setLoginUser={setLoginUser}
          handleLogin={handleLogin}
          handleRegister={handleRegister}
        />
      </div>
    </div>
  )
}