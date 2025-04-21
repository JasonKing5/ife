import { createContext, useContext, useState, useEffect } from "react"
import { UserBase } from "@/types/user"

interface AuthContextType {
  token: string | null
  refreshToken: string | null
  user: UserBase | null
  setToken: (token: string | null) => void
  setRefreshToken: (token: string | null) => void
  setUser: (user: UserBase | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"))
  const [refreshToken, setRefreshToken] = useState<string | null>(() => localStorage.getItem("refreshToken"))
  const [user, setUser] = useState<UserBase | null>(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  })

  useEffect(() => {
    if (token) localStorage.setItem("token", token)
    else localStorage.removeItem("token")
  }, [token])

  useEffect(() => {
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken)
    else localStorage.removeItem("refreshToken")
  }, [refreshToken])

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user))
    else localStorage.removeItem("user")
  }, [user])

  const logout = () => {
    setToken(null)
    setRefreshToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, refreshToken, user, setToken, setRefreshToken, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}