import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Sparkles, BadgeCheck, CreditCard, Bell, LogOut, BellDot, User } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useState, useRef, useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

const AccountMenu = () => {
  const { token, user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const avatarUrl = user?.avatar || 'https://github.com/shadcn.png'
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  const handleClick = () => {
    if (token) {
      setOpen(!open)
    } else {
      navigate('/login')
    }
  }

  const handleLogout = () => {
    navigate('/login')
    logout()
  }

  return (
    <div className="flex items-center gap-2 relative">
      <Avatar className="h-8 w-8 rounded-lg cursor-pointer" onClick={handleClick}>
        <AvatarImage src={avatarUrl} alt={user?.username} />
        <AvatarFallback className="rounded-lg">{user?.username?.slice(0, 2)}</AvatarFallback>
      </Avatar>
      {open && (
        <div
          ref={menuRef}
          className="flex flex-col absolute top-[55px] right-0 bg-white rounded-lg shadow-lg z-21"
        >
          <div className="flex items-center gap-2 p-2">
            <Avatar className="h-8 w-8 rounded-lg cursor-pointer" onClick={() => {}}>
              <AvatarImage src={avatarUrl} alt={user?.username} />
              <AvatarFallback className="rounded-lg">{user?.username?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="font-medium">{user?.username}</div>
              <div className="font-medium">{user?.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 hover:bg-gray-100 p-2">
            <User className="size-4" />
            <span className="font-medium">Profile</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 hover:bg-gray-100 p-2 mb-2" onClick={handleLogout}>
            <LogOut className="size-4" />
            <span className="font-medium">Log out</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountMenu
