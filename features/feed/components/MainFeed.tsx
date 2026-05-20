"use client"

import { useState } from "react"
import { BlogCard } from "./BlogCard"
import { posts, tabs } from "@/features/feed/constants/posts"

export function MainFeed() {
  const [activeTab, setActiveTab] = useState("For you")

  return (
    <main className="flex-1 min-w-0">
      <div
        className="flex items-center gap-0 mb-1 sticky top-14 bg-white z-10"
        style={{ borderBottom: "1px solid #E6E6E6" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative px-1 py-3 mr-6 text-sm font-medium transition-colors"
            style={{
              fontFamily: '"Inter", sans-serif',
              color: activeTab === tab ? "#242424" : "#757575",
            }}
          >
            {tab}
            {activeTab === tab && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ backgroundColor: "#242424" }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        {posts.map((post, index) => (
          <div key={post.id}>
            <BlogCard post={post} />
            {index < posts.length - 1 && (
              <div style={{ borderTop: "1px solid #E6E6E6" }} />
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
