import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRegister, useLogin } from "@/hooks/useUserQuery"
import { CreateUserRequest, LoginResponse } from "@/types/user"
import { useState } from "react"

const defaultUser: CreateUserRequest = {
  username: "",
  email: "",
  password: "",
  role: "user"
}

export default function LoginPage() {
  const [user, setUser] = useState<CreateUserRequest>(defaultUser)
  const { mutate } = useRegister()
  const { mutate: login } = useLogin({
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem('token', data.token)
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
      
      <Button variant="secondary" onClick={handleRegister}>注册</Button>
      <Button variant="secondary" onClick={handleLogin}>登录</Button>
    </div>
  )
}