import { get, post, put, del } from '@/lib/request'
import { UserResponse, RegisterResponse, RegisterRequest, UpdateUserRequest, LoginRequest, LoginResponse, CreateUserResponse, CreateUserRequest, UpdatePasswordRequest } from '@/types/user'

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

export const useRefreshToken = (options?: any) => {
  return post<LoginResponse, string>(`/auth/refresh`, options)
}

export const useLogout = (options?: any) => {
  return post<LoginResponse, void>(`/auth/logout`, options)
}

export const useResetPassword = (options?: any) => {
  return post<LoginResponse, { email: string }>(`/auth/reset`, options)
}

export const useUpdatePassword = (options?: any) => {
  return put<UserResponse, UpdatePasswordRequest>(`/auth/update/password`, options)
}
