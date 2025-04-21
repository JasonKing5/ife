import axios from "axios"
import { toast } from 'sonner';

const instance = axios.create({
  baseURL: "/api", // 可根据环境配置
  // baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1',
  timeout: 10000,
})

// 刷新 token 的锁和等待队列
let isRefreshing = false
let refreshPromise: Promise<any> | null = null
let subscribers: ((token: string) => void)[] = []

function onRefreshed(token: string) {
  subscribers.forEach(cb => cb(token))
  subscribers = []
}

function addSubscriber(cb: (token: string) => void) {
  subscribers.push(cb)
}

function refreshTokenRequest() {
  const refreshToken = localStorage.getItem('refreshToken')
  // 用原生 axios，避免再次进入拦截器死循环
  return axios.post('/api/auth/refresh', { refreshToken })
}

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
      if (res?.code === 401) {
        if (!isRefreshing) {
          isRefreshing = true
          refreshPromise = refreshTokenRequest()
            .then(res => {
              const data = res.data
              if (data?.code === 0 && data?.data?.token) {
                localStorage.setItem('token', data.data.token)
                // localStorage.setItem('refreshToken', data.data.refreshToken)
                onRefreshed(data.data.token)
                return data.data.token
              } else {
                throw new Error('刷新 token 失败')
              }
            })
            .catch(e => {
              localStorage.removeItem('token')
              localStorage.removeItem('refreshToken')
              location.href = '/login'
              // 只有刷新失败时才提示
              toast.warning('登录状态已失效，请重新登录')
              return Promise.reject(e)
            })
            .finally(() => {
              isRefreshing = false
              refreshPromise = null
            })
        }
        // 401场景下不弹toast，直接reject
        return Promise.reject(res);
      }
      // 其它业务错误才弹toast
      toast.warning(res.message || '操作失败');
      return Promise.reject(res);
    }
    // 成功则只返回数据部分
    return res.data;
  },
  async (err) => {
    console.error("API error:", err)
    const message =
      err?.response?.data?.message || err?.message || '服务器错误';
    toast.error(message);
    return Promise.reject(err);
  }
)

export default instance