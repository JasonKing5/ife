import { Role } from "@/types/user";

export interface MenuItem {
  label: string;
  path: string;
  roles?: Role[];
}

export const menuList: MenuItem[] = [
  {
    label: "Home",
    path: "/",
    roles: ["admin", "user"],
  },
  {
    label: "User",
    path: "/user",
    roles: ["admin"],
  },
];