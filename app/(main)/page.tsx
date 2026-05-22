"use client"

import { MainFeed } from "@/features/feed/components/MainFeed"
import { RightSidebar } from "@/features/feed/components/RightSidebar"

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-56px)]">
      <div className="flex-1 min-w-0 px-4 md:px-10 lg:px-16 max-w-4xl mx-auto">
        <MainFeed />
      </div>

      <div
        className="hidden lg:block shrink-0 w-96 px-8 py-6"
        style={{ borderLeft: "1px solid #E6E6E6" }}
      >
        <RightSidebar />
      </div>
    </div>
  )
}
