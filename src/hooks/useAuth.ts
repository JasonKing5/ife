export const useAuth = () => {
  const token = localStorage.getItem("token");
  return { token };
};

export const useUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return { role: user.role };
};