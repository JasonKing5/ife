import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRegister, useLogin } from "@/hooks/useUserQuery"
import { RegisterRequest, LoginResponse } from "@/types/user"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const defaultUser: RegisterRequest = {
  username: "",
  email: "",
  password: "",
  role: "user"
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<RegisterRequest>(defaultUser)
  const { mutate } = useRegister()
  const { mutate: login } = useLogin({
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/')
    }
  })

  const handleRegister = () => {
    if (!user) return
    mutate({ username: user.username, email: user.email, password: user.password, role: user.role })
  }

  const handleLogin = () => {
    if (!user) return
    login({ username: user.username, password: user.password })
  }

  return (
    <div>
      <label>username</label>
      <Input type="text" value={user?.username} onChange={(e: { target: { value: any } }) => setUser({ ...user, username: e.target.value })} />
      <label>email</label>
      <Input type="text" value={user?.email} onChange={(e: { target: { value: any } }) => setUser({ ...user, email: e.target.value })} />
      <label>password</label>
      <Input type="text" value={user?.password} onChange={(e: { target: { value: any } }) => setUser({ ...user, password: e.target.value })} />

      <Button variant="secondary" onClick={handleLogin}>登录</Button>

      <div className="mt-4">
        <div>Not a member?</div>
        <Button variant="secondary" onClick={handleRegister}>注册</Button>
      </div>
    </div>
  )
}