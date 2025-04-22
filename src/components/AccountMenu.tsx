import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User } from "lucide-react"
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

  const handleClick = () => {
    if (!token) {
      navigate('/login')
    }
  }

  const handleLogout = () => {
    navigate('/login')
    logout()
  }

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger className="w-8 h-8 !p-0 !border-none !bg-transparent" onClick={handleClick}>
          <Avatar className="h-8 w-8 rounded-lg cursor-pointer">
            <AvatarImage src={avatarUrl} alt={user?.username} />
            <AvatarFallback className="rounded-lg">{user?.username?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex items-center gap-2 pb-2">
            <Avatar className="h-8 w-8 rounded-lg" onClick={() => {}}>
              <AvatarImage src={avatarUrl} alt={user?.username} />
              <AvatarFallback className="rounded-lg">{user?.username?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="font-medium text-ellipsis w-[220px] overflow-hidden">{user?.username}</div>
              <div className="font-medium text-ellipsis w-[220px] overflow-hidden">{user?.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 hover:bg-gray-100 p-2">
            <User className="size-4" />
            <span className="font-medium">Profile</span>
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
