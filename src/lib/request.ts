import axios from "./axios"
import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query'

export const get = <T = any>(url: string, params?: any, options?: any): UseQueryResult<T, Error> =>
  useQuery({
    queryKey: [url, params],
    queryFn: () => axios.get<T>(url, { params }),
    ...options,
  })

export const post = <T = any, D = any>(url: string, options?: any): UseMutationResult<T, Error, D> =>
  useMutation<T, Error, D>({
    mutationFn: (data: D) => axios.post(url, data),
    ...options,
  })

export const put = <T = any, D = any>(url: string, options?: any): UseMutationResult<T, Error, D> =>
  useMutation<T, Error, D>({
    mutationFn: (data: D) => axios.put(url, data),
    ...options,
  })

export const del = <T = any>(url: string, options?: any): UseMutationResult<T, Error, void> =>
  useMutation<T, Error, void>({
    mutationFn: () => axios.delete(url),
    ...options,
  })
