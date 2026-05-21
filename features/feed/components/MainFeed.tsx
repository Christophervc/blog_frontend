"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { BlogCard } from "./BlogCard"
import { usePublishedPosts } from "@/features/feed/hooks/use-published-posts"
import { mapPostToBlogCard } from "@/features/feed/services/post-mapper"
import { tabs } from "@/features/feed/constants/posts"

export function MainFeed() {
  const [activeTab, setActiveTab] = useState("For you")
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = usePublishedPosts()

  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sentinelRef.current || !hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  const allPosts = data?.pages.flatMap((page) => page.data) ?? []
  const blogCards = allPosts.map(mapPostToBlogCard)

  if (isLoading) {
    return (
      <main className="flex-1 min-w-0">
        <div className="flex flex-col gap-6 py-8 px-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse flex flex-col gap-3">
              <div className="h-3 w-48 bg-gray-200 rounded" />
              <div className="h-5 w-full bg-gray-200 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="flex-1 min-w-0">
        <p className="text-sm text-center py-12" style={{ color: "#757575", fontFamily: '"Inter", sans-serif' }}>
          Unable to load posts. Please try again later.
        </p>
      </main>
    )
  }

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

      {blogCards.length === 0 ? (
        <p className="text-sm text-center py-12" style={{ color: "#757575", fontFamily: '"Inter", sans-serif' }}>
          No published posts yet.
        </p>
      ) : (
        <div className="flex flex-col">
          {blogCards.map((post, index) => (
            <div key={post.id}>
              <Link href={`/posts/${post.slug}-${post.id}`}>
                <BlogCard post={post} />
              </Link>
              {index < blogCards.length - 1 && (
                <div style={{ borderTop: "1px solid #E6E6E6" }} />
              )}
            </div>
          ))}
        </div>
      )}

      <div ref={sentinelRef} className="h-4" />

      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <div
            className="w-5 h-5 rounded-full animate-spin"
            style={{
              border: "2px solid #E6E6E6",
              borderTopColor: "#242424",
            }}
          />
        </div>
      )}
    </main>
  )
}
