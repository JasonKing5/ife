import { Role } from "@/types/user";

export interface MenuItem {
  label: string;
  path: string;
  roles?: Role[];
}

export const menuList: MenuItem[] = [
  {
    label: "Auto Job AI",
    path: "/",
    roles: ["admin", "user"],
  },
  {
    label: "User",
    path: "/user",
    roles: ["admin"],
  },
  {
    label: "Dashboard",
    path: "/dashboard",
    roles: ["user"],
  },
];