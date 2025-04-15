import axios from "./axios"
import { useQuery, useMutation, UseQueryResult, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const get = <T = any>(url: string, params?: any, options?: any): UseQueryResult<T, Error> =>
  useQuery({
    queryKey: [url, params],
    queryFn: () => axios.get<T>(url, { params }),
    ...options,
  })

// 通用 onSuccess 处理，自动 toast + invalidateQueries，可自定义 successMessage/invalidate
interface GlobalSuccessOptions {
  successMessage?: string;
  invalidate?: boolean;
  [key: string]: any; // 允许透传其它 mutation options
}
function withGlobalSuccess(url: string, options?: GlobalSuccessOptions) {
  const queryClient = useQueryClient();
  const { successMessage, invalidate = true, ...restOptions } = options || {};
  return {
    ...restOptions,
    onSuccess: (data: any, ...rest: any[]) => {
      const message = successMessage || '操作成功';
      toast.success(message);
      if (invalidate) {
        queryClient.invalidateQueries({ queryKey: [url] });
      }
      options?.onSuccess?.(data, ...rest);
    }
  };
}

export const post = <T = any, D = any>(url: string, options?: GlobalSuccessOptions): UseMutationResult<T, Error, D> =>
  useMutation<T, Error, D>({
    mutationFn: (data: D) => axios.post(url, data),
    ...withGlobalSuccess(url, options),
  })

export const put = <T = any, D = any>(url: string, options?: GlobalSuccessOptions): UseMutationResult<T, Error, D> =>
  useMutation<T, Error, D>({
    mutationFn: (data: D) => axios.put(url, data),
    ...withGlobalSuccess(url, options),
  })

export const del = <T = any, D = any>(url: string, options?: GlobalSuccessOptions): UseMutationResult<T, Error, D> =>
  useMutation<T, Error, D>({
    mutationFn: (data: D) => {
      if (typeof data === 'number' || typeof data === 'string') {
        return axios.delete(`${url}/${data}`)
      } else if (data && typeof data === 'object' && 'id' in data) {
        return axios.delete(`${url}/${data.id}`)
      } else {
        return axios.delete(url)
      }
    },
    ...withGlobalSuccess(url, options),
  })
