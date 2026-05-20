import { Home, Bookmark, User, FileText, ChartBar as BarChart3 } from "lucide-react"
import type { ComponentType } from "react"

export interface NavItem {
  icon: ComponentType<{ className?: string; style?: React.CSSProperties }>
  label: string
  active?: boolean
}

export const navItems: NavItem[] = [
  { icon: Home, label: "Home", active: true },
  { icon: Bookmark, label: "Library" },
  { icon: User, label: "Profile" },
  { icon: FileText, label: "Stories" },
  { icon: BarChart3, label: "Stats" },
]

export interface FollowingItem {
  name: string
  hasActivity: boolean
  initial: string
  color: string
}

export const followingItems: FollowingItem[] = [
  { name: "Javarevisited", hasActivity: true, initial: "J", color: "#1a7f37" },
  { name: "Medium Staff", hasActivity: false, initial: "M", color: "#242424" },
]
