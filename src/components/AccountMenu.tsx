import React, { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Settings } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import CircleUserRound from '@/assets/circle-user-round.svg';

const AccountMenu = () => {
  const { token, user, logout } = useAuth()
  const navigate = useNavigate()
  const avatarUrl = user?.avatar || CircleUserRound
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    if (!token) {
      navigate('/login')
    } else {
      setOpen(true)
    }
  }

  const handleLogout = () => {
    setOpen(false)
    navigate('/login')
    logout()
  }

  const getInitials = (name?: string) => {
    if (!name) return ""
    return name
      .split(/\s|_|-/)
      .filter(Boolean)
      .slice(0, 2)
      .map(word => word[0]?.toUpperCase() || "")
      .join("")
  }

  const renderAvatar = () => {
    return (
      <Avatar className="h-8 w-8 rounded-lg cursor-pointer">
        {token
          ? (user?.avatar 
            ? <AvatarImage src={avatarUrl} alt={user?.username} />
            : <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 font-medium hover:bg-gray-200 hover:text-gray-600">{getInitials(user?.username)}</div>
          )
          : <AvatarImage src={avatarUrl} alt={user?.username} />}
      </Avatar>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-8 h-8 !p-0 !border-none !bg-transparent" onClick={handleClick}>
          {renderAvatar()}
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex items-center gap-2 pb-2">
            {renderAvatar()}
            <div className="flex flex-col">
              <div className="font-medium text-ellipsis w-[220px] overflow-hidden">{user?.username}</div>
              <div className="font-medium text-ellipsis w-[220px] overflow-hidden">{user?.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 hover:bg-gray-100 p-2" onClick={() => { setOpen(false); navigate('/settings') }}>
            <Settings className="size-4" />
            <span className="font-medium">Settings</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 hover:bg-gray-100 p-2" onClick={handleLogout}>
            <LogOut className="size-4" />
            <span className="font-medium">Log out</span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default AccountMenu
