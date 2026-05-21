import { api } from "@/lib/api"

export interface LoginResponse {
  message: string
}

export interface ErrorResponse {
  message: string
  statusCode?: number
}

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post<LoginResponse>("/auth/login", { email, password })
    return response.data
  },

  register: async (
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const response = await api.post("/auth/register", {
      fullName,
      email,
      password,
      confirmPassword,
    })
    return response.data
  },

  logout: async () => {
    const response = await api.post("/auth/logout")
    return response.data
  },
}
