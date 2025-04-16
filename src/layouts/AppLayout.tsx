import { NavLink, Outlet } from "react-router-dom";
import { menuList } from "@/constants/menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Role } from "@/types/user";

export default function AppLayout() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  // 菜单过滤逻辑：
  // 1. 未登录时，仅显示所有普通用户（role: 'user'）可见的菜单（或 roles 未定义的菜单）
  // 2. 登录后，按当前用户 role 显示所有有权限的菜单
  let visibleMenu = []
  if (!token) {
    visibleMenu = menuList.filter(
      item => !item.roles || item.roles.includes('user')
    )
  } else {
    visibleMenu = menuList.filter(
      item => !item.roles || item.roles.includes(user?.role as Role)
    )
  }

  return (
    <div className="min-h-screen min-w-screen bg-gray-50 flex flex-col">
      <header className="flex gap-4 justify-between items-center h-14 border-b-1 border-b-[#e2e2e3] pl-4 pr-4">
        <div className="flex gap-4">
          {visibleMenu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold flex items-center gap-1" : "text-gray-600 flex items-center gap-1"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        {!token && (
          <Button
            variant="secondary"
            onClick={() => navigate('/login')}
            className="text-blue-600 font-bold"
          >
            Login
          </Button>
        )}
        {token && (
          <Button
            variant="secondary"
            onClick={() => {
              logout()
              navigate('/login')
            }}
            className="text-blue-600 font-bold"
          >
            Logout
          </Button>
        )}
      </header>
      <main className="flex-1 flex">
        <Outlet />
      </main>
    </div>
  );
}