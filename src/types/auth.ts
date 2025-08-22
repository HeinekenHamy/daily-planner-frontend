export interface User {
    id: number
    email: string
  }
  
  export interface LoginData {
    email: string
    password: string
  }
  
  export interface RegisterData {
    email: string
    password: string
    password_confirmation: string
  }
  
  export interface AuthResponse {
    token: string
    user: User
  }