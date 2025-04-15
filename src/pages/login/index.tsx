import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRegister, useLogin } from "@/hooks/useUserQuery"
import { RegisterRequest, LoginResponse } from "@/types/user"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const defaultUser: RegisterRequest = {
  username: "",
  email: "",
  password: "",
  role: "user"
}

export default function LoginPage() {
  const { setToken, setUser } = useAuth()
  const navigate = useNavigate()
  const [loginUser, setLoginUser] = useState<RegisterRequest>(defaultUser)
  const { mutate } = useRegister()
  const { mutate: login } = useLogin({
    onSuccess: (data: LoginResponse) => {
      setToken(data.token)
      setUser(data.user)
      navigate('/')
    }
  })

  const handleRegister = () => {
    if (!loginUser) return
    mutate({ username: loginUser.username, email: loginUser.email, password: loginUser.password, role: loginUser.role })
  }

  const handleLogin = () => {
    if (!loginUser) return
    login({ username: loginUser.username, password: loginUser.password })
  }

  return (
    <div>
      <label>username</label>
      <Input type="text" value={loginUser?.username} onChange={(e: { target: { value: any } }) => setLoginUser({ ...loginUser, username: e.target.value })} />
      <label>email</label>
      <Input type="text" value={loginUser?.email} onChange={(e: { target: { value: any } }) => setLoginUser({ ...loginUser, email: e.target.value })} />
      <label>password</label>
      <Input type="text" value={loginUser?.password} onChange={(e: { target: { value: any } }) => setLoginUser({ ...loginUser, password: e.target.value })} />

      <Button variant="secondary" onClick={handleLogin}>登录</Button>

      <div className="mt-4">
        <div>Not a member?</div>
        <Button variant="secondary" onClick={handleRegister}>注册</Button>
      </div>
    </div>
  )
}