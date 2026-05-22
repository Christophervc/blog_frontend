"use client"

import { Navbar } from "@/components/Navbar"
import { LeftSidebar } from "@/features/feed/components/LeftSidebar"
import { useState } from "react"
import { usePathname } from "next/navigation"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const isEditor = pathname === "/write"

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '"Inter", sans-serif' }}>
      <Navbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
      {!isEditor && <LeftSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

      <div className={`pt-14 min-h-screen ${isEditor ? "" : "md:pl-56"}`}>
        {children}
      </div>
    </div>
  )
}
