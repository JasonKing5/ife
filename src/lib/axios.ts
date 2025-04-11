import axios from "axios"
import { toast } from 'sonner';

const instance = axios.create({
  baseURL: "/api", // 可根据环境配置
  // baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1',
  timeout: 10000,
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    const res = response.data;

    // 如果是自定义业务错误
    if (res?.code !== 0) {
      toast.warning(res.message || '操作失败');
      // 拦截业务错误，拒绝 promise，交由 catch 处理（比如 react-query）
      return Promise.reject(res);
    }

    // 成功则只返回数据部分
    return res.data;
  },
  (err) => {
    console.error("API error:", err)

    const message =
      err?.response?.data?.message || err?.message || '服务器错误';
    toast.error(message);
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      location.href = '/login'
    }
    return Promise.reject(err);
  }
)

export default instance