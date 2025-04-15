export type Role = "admin" | "user";

export interface UserBase {
  id: number;
  email: string;
  username: string;
  role: Role;
}

export interface RegisterRequest {
  username: string;
  email: string;
  role: Role;
  password: string;
}

export interface RegisterResponse extends UserBase {}

export interface CreateUserRequest {
  username: string;
  email: string;
}

export interface CreateUserResponse extends UserBase {}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse extends UserBase {
  token: string;
  user: UserBase;
}

export interface UserResponse extends UserBase {
}

export interface UpdateUserRequest extends UserBase {
}

export interface UpdateUserResponse extends UserBase {
}

