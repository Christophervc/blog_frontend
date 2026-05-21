"use client"

import { Navbar } from "@/components/Navbar"
import { LeftSidebar } from "@/features/feed/components/LeftSidebar"
import { useState } from "react"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '"Inter", sans-serif' }}>
      <Navbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
      <LeftSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="pt-14 md:pl-56 min-h-screen">
        {children}
      </div>
    </div>
  )
}
