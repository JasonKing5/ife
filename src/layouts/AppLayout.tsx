import { NavLink, Outlet } from "react-router-dom";
import { menuList } from "@/constants/menu";
import { useAuth, useUserRole } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AppLayout() {
  const { token } = useAuth();
  const { role } = useUserRole();
  const navigate = useNavigate();

  const visibleMenu = menuList.filter(
    (item) => !item.roles || item.roles.includes(role)
  );

  return (
    <div className="min-h-screen min-w-screen bg-gray-50 p-4 flex flex-col">
      <header className="mb-4 flex gap-4 justify-between items-center h-10">
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
              localStorage.clear()
              navigate('/login')
            }}
            className="text-blue-600 font-bold"
          >
            Logout
          </Button>
        )}
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}