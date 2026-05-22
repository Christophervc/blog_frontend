import { Home, Bookmark, User, FileText, ChartBar as BarChart3 } from "lucide-react"
import type { ComponentType } from "react"

export interface NavItem {
  icon: ComponentType<{ className?: string; style?: React.CSSProperties }>
  label: string
  active?: boolean
  href: string
}

export const navItems: NavItem[] = [
  { icon: Home, label: "Home", active: true, href: "/" },
  { icon: Bookmark, label: "Library", href: "/" },
  { icon: User, label: "Profile", href: "/" },
  { icon: FileText, label: "Stories", href: "/" },
  { icon: BarChart3, label: "Stats", href: "/" },
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
