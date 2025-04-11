import { get, post, put, del } from '@/lib/request'
import { UserResponse, CreateUserRequest, UpdateUserRequest, LoginRequest, LoginResponse, CreateUserResponse } from '@/types/user'

export const useRegister = (options?: any) => {
  return post<CreateUserResponse, CreateUserRequest>(`/auth/register`, options)
}

export const useQueryUser = (userId: UserResponse['id'], options?: any) => {
  return get<UserResponse>(`/users/${userId}`, options)
}

export const useQueryUsers = (options?: any) => {
  return get<UserResponse[]>(`/users`, options)
}

export const useUpdateUser = (userId: UserResponse['id'], options?: any) => {
  return put<UserResponse, UpdateUserRequest>(`/users/${userId}`, options)
}

export const useDeleteUser = (userId: UserResponse['id'], options?: any) => {
  return del<UserResponse>(`/users/${userId}`, options)
}

export const useLogin = (options?: any) => {
  return post<LoginResponse, LoginRequest>(`/auth/login`, options)
}

export const useLogout = (options?: any) => {
  return post<LoginResponse, void>(`/auth/logout`, options)
}
