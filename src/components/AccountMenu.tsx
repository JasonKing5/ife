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

  const getInitials = (name?: string) => {
    if (!name) return ""
    // 只取前两个单词的首字母，支持中英文
    return name
      .split(/[\s_-]+/) // 按空格、下划线、连字符分词
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
      <Popover>
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
