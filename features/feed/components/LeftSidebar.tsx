"use client"

import { Plus, NotebookPen } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navItems, followingItems } from "@/features/feed/constants/navigation"
import { useAuthStore } from "@/lib/store/authStore"

interface LeftSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function LeftSidebar({ isOpen, onClose }: LeftSidebarProps) {
  const pathname = usePathname()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-14 left-0 bottom-0 z-40 w-56 bg-white flex flex-col py-6
          transition-transform duration-200
          md:translate-x-0 md:flex
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{ borderRight: "1px solid #E6E6E6" }}
      >
        <nav className="flex flex-col gap-1 px-4">
          {navItems.map(({ icon: Icon, label, active }) => (
            <Link
              href={active ? "/" : label.toLowerCase()}
              key={label}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors w-full text-left cursor-pointer
                ${active
                  ? "text-[#242424]"
                  : "text-[#757575] hover:text-[#242424] hover:bg-gray-50"
                }
              `}
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              <Icon
                className="w-5 h-5 shrink-0"
                style={{ color: active ? "#242424" : "#757575" }}
              />
              <span className={active ? "font-semibold" : ""}>{label}</span>
            </Link>
          ))}

          {isAuthenticated && (
            <>
              <div className="my-2" style={{ borderTop: "1px solid #E6E6E6" }} />
              <Link
                href="/drafts"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors w-full text-left
                  ${pathname === "/drafts" ? "text-[#242424]" : "text-[#757575] hover:text-[#242424] hover:bg-gray-50"}
                `}
                style={{ fontFamily: '"Inter", sans-serif' }}
                onClick={onClose}
              >
                <NotebookPen
                  className="w-5 h-5 shrink-0"
                  style={{ color: pathname === "/drafts" ? "#242424" : "#757575" }}
                />
                <span className={pathname === "/drafts" ? "font-semibold" : ""}>Drafts</span>
              </Link>
            </>
          )}
        </nav>

        <div className="my-5 mx-4" style={{ borderTop: "1px solid #E6E6E6" }} />

        <div className="px-4 flex flex-col gap-3">
          <span
            className="text-xs font-semibold px-3"
            style={{ color: "#757575", fontFamily: '"Inter", sans-serif', letterSpacing: "0.01em" }}
          >
            Following
          </span>

          <div className="flex flex-col gap-1">
            {followingItems.map(({ name, hasActivity, initial, color }) => (
              <button
                key={name}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left hover:bg-gray-50"
                style={{ fontFamily: '"Inter", sans-serif', color: "#242424" }}
              >
                <div className="relative shrink-0">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: color, fontSize: "10px" }}
                  >
                    {initial}
                  </div>
                  {hasActivity && (
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white"
                      style={{ backgroundColor: "#1a7f37" }}
                    />
                  )}
                </div>
                <span className="text-sm" style={{ color: "#242424" }}>{name}</span>
              </button>
            ))}
          </div>

          <button
            className="flex items-start gap-2.5 px-3 py-2 rounded-md transition-colors w-full text-left hover:bg-gray-50 mt-1"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            <div
              className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5"
              style={{ borderColor: "#E6E6E6" }}
            >
              <Plus className="w-3 h-3" style={{ color: "#757575" }} />
            </div>
            <span className="text-sm leading-snug" style={{ color: "#757575" }}>
              Find writers and publications to follow.
            </span>
          </button>

          <button
            className="text-sm px-3 text-left transition-colors hover:text-[#242424]"
            style={{ color: "#757575", fontFamily: '"Inter", sans-serif' }}
          >
            See suggestions
          </button>
        </div>
      </aside>
    </>
  )
}
