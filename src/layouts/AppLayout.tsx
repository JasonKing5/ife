import { NavLink, Outlet } from "react-router-dom";
import { menuList } from "@/constants/menu";

export default function AppLayout() {
  return (
    <div className="min-h-screen min-w-screen p-6 bg-gray-50">
      <header className="mb-4 flex gap-4">
        {menuList.map((item) => (
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
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : "text-gray-600"
          }
        >
          Login
        </NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}