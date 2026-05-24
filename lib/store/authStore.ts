import { create } from "zustand"
import { persist } from "zustand/middleware"
import { api } from "@/lib/api"

export interface UserProfile {
  id: string
  name: string
  email: string
  role: "USER" | "MODERATOR" | "ADMIN"
}

interface AuthState {
  isAuthenticated: boolean
  user: UserProfile | null
  userInitial: string | null
  email: string | null
  loginSuccess: (email: string, displayName: string) => void
  setUser: (user: UserProfile) => void
  fetchUser: () => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      userInitial: null,
      email: null,
      loginSuccess: (email: string, displayName: string) => {
        const initial = displayName.charAt(0).toUpperCase()
        set({ isAuthenticated: true, userInitial: initial, email })
      },
      setUser: (user: UserProfile) => set({ user }),
      fetchUser: async () => {
        try {
          const response = await api.get("/users/me", {
            validateStatus: (status) => status < 500,
          })
          if (response.status === 200) {
            const data = response.data
            set({
              isAuthenticated: true,
              user: {
                id: data.id ?? "",
                name: data.name ?? "",
                email: data.email ?? "",
                role: data.role ?? "USER",
              },
              email: data.email,
              userInitial: data.name ? data.name.charAt(0).toUpperCase() : null,
            })
          } else {
            set({ isAuthenticated: false, user: null, userInitial: null, email: null })
          }
        } catch {
          set({ isAuthenticated: false, user: null, userInitial: null, email: null })
        }
      },
      logout: () => {
        set({ isAuthenticated: false, user: null, userInitial: null, email: null })
      },
    }),
    { name: "auth_session" }
  )
)
