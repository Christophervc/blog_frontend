import { Search, SquarePen, Bell, Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface HeaderProps {
  onMenuToggle: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-14 bg-white flex items-center px-4 md:px-6"
      style={{ borderBottom: "1px solid #E6E6E6" }}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" style={{ color: "#242424" }} />
        </button>

        <span
          className="text-2xl font-bold select-none shrink-0"
          style={{
            fontFamily: '"Lora", serif',
            color: "#242424",
            letterSpacing: "-0.5px",
          }}
        >
          Blogium
        </span>

        <div className="hidden md:flex items-center gap-2 rounded-full px-3 h-9 w-64" style={{ backgroundColor: "#F2F2F2" }}>
          <Search className="w-4 h-4 shrink-0" style={{ color: "#757575" }} />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none outline-none text-sm flex-1 min-w-0 placeholder:text-[#757575]"
            style={{ fontFamily: '"Inter", sans-serif', color: "#242424" }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1 md:gap-2 shrink-0">
        <button
          className="hidden sm:flex items-center gap-1.5 px-4 h-8 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{
            backgroundColor: "#242424",
            fontFamily: '"Inter", sans-serif',
            fontSize: "13px",
          }}
        >
          Get app
        </button>

        <button
          className="hidden sm:flex items-center gap-1.5 px-2 h-8 rounded-full text-sm transition-colors hover:bg-gray-100"
          style={{ color: "#757575", fontFamily: '"Inter", sans-serif' }}
        >
          <SquarePen className="w-4 h-4" />
          <span className="text-sm">Write</span>
        </button>

        <button
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" style={{ color: "#757575" }} />
        </button>

        <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" alt="User" />
          <AvatarFallback className="text-xs font-medium" style={{ backgroundColor: "#F2F2F2", color: "#242424" }}>
            U
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
