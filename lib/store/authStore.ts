import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  isAuthenticated: boolean
  userInitial: string | null
  email: string | null
  loginSuccess: (email: string, displayName: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userInitial: null,
      email: null,
      loginSuccess: (email: string, displayName: string) => {
        const initial = displayName.charAt(0).toUpperCase()
        set({ isAuthenticated: true, userInitial: initial, email })
      },
      logout: () => {
        set({ isAuthenticated: false, userInitial: null, email: null })
      },
    }),
    { name: "auth_session" }
  )
)
