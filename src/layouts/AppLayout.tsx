import { NavLink, Outlet } from "react-router-dom";
import { menuList } from "@/constants/menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Role } from "@/types/user";

export default function AppLayout() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const visibleMenu = menuList.filter(
    (item) => !item.roles || item.roles.includes(user?.role as Role)
  );

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
            onClick={() => navigate('/login')}
            className="text-blue-600 font-bold"
          >
            Login
          </Button>
        )}
        {token && (
          <Button
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