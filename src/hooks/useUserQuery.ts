import { get, post, put, del } from '@/lib/request'
import { UserResponse, RegisterResponse, RegisterRequest, UpdateUserRequest, LoginRequest, LoginResponse, CreateUserResponse, CreateUserRequest } from '@/types/user'

export const useRegister = (options?: any) => {
  return post<RegisterResponse, RegisterRequest>(`/auth/register`, options)
}

export const useCreateUser = (options?: any) => {
  return post<CreateUserResponse, CreateUserRequest>(`/users`, options)
}

export const useQueryUser = (options?: any) => {
  return get<UserResponse>(`/users`, options)
}

export const useQueryUsers = (options?: any) => {
  return get<UserResponse[]>(`/users`, options)
}

export const useUpdateUser = (options?: any) => {
  return put<UserResponse, UpdateUserRequest>(`/users`, options)
}

export const useDeleteUser = (options?: any) => {
  return del<UserResponse, number>(`/users`, options)
}

export const useLogin = (options?: any) => {
  return post<LoginResponse, LoginRequest>(`/auth/login`, options)
}

export const useLogout = (options?: any) => {
  return post<LoginResponse, void>(`/auth/logout`, options)
}

export const useResetPassword = (options?: any) => {
  return post<LoginResponse, { email: string }>(`/auth/reset`, options)
}
