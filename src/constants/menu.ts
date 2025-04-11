export interface MenuItem {
  label: string;
  path: string;
}

export const menuList: MenuItem[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "User",
    path: "/user",
  },
];