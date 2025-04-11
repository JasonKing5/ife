import './App.css'
import UserPage from './pages/user'
import LoginPage from './pages/login'
import { useState } from 'react'
import { Button } from "@/components/ui/button"

function App() {
  const [showLogin, setShowLogin] = useState(true)
  return (
    <>
      <Button variant="secondary" onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'Go to home' : 'Go to login'}</Button>
      {showLogin && <LoginPage />}
      {!showLogin && <UserPage />}
    </>
  )
}

export default App
