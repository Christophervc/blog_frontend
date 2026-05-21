"use client";
import { Navbar } from "@/components/Navbar";
import { LeftSidebar } from "@/features/feed/components/LeftSidebar";
import { MainFeed } from "@/features/feed/components/MainFeed";
import { RightSidebar } from "@/features/feed/components/RightSidebar";
import { useState } from "react";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '"Inter", sans-serif' }}>
      <Navbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
      <LeftSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main layout: offset by sidebar on desktop */}
      <div className="pt-14 md:pl-56 min-h-screen">
        <div className="flex min-h-[calc(100vh-56px)]">
          {/* Central feed */}
          <div className="flex-1 min-w-0 px-4 md:px-10 lg:px-16 max-w-3xl">
            <MainFeed />
          </div>

          {/* Right sidebar with left border */}
          <div
            className="hidden lg:block shrink-0 w-80 px-8 py-6"
            style={{ borderLeft: "1px solid #E6E6E6" }}
          >
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
