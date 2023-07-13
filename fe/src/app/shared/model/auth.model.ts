export interface LoginRequest {
  userEmail: string;
  userPassword: string;
}

export interface LoginResponse {
  id: number;
  userName: string;
  userEmail: string;
}
