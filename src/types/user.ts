export interface UserBase {
  id: number;
  email: string;
  username: string;
  role: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  role: string;
  password: string;
}

export interface CreateUserResponse extends UserBase {}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse extends UserBase {
  token: string;
}


export interface UserResponse extends UserBase {
}

export interface UpdateUserRequest extends UserBase {
}

export interface UpdateUserResponse extends UserBase {
}

