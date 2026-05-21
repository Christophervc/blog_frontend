"use client"

import { NotebookPen } from "lucide-react"
import { useDrafts } from "@/features/feed/hooks/use-drafts"
import { BlogCard } from "@/features/feed/components/BlogCard"
import { mapPostToBlogCard } from "@/features/feed/services/post-mapper"

export default function DraftsPage() {
  const { data: drafts, isLoading, isError } = useDrafts()

  if (isLoading) {
    return (
      <main className="flex-1 min-w-0 px-4 md:px-10 lg:px-16 max-w-3xl">
        <div className="flex flex-col gap-4 py-8 animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
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
      <main className="flex-1 min-w-0 px-4 md:px-10 lg:px-16 max-w-3xl">
        <p
          className="text-sm text-center py-12"
          style={{ color: "#757575", fontFamily: '"Inter", sans-serif' }}
        >
          Unable to load drafts. Please try again later.
        </p>
      </main>
    )
  }

  if (!drafts || drafts.length === 0) {
    return (
      <main className="flex-1 min-w-0 px-4 md:px-10 lg:px-16 max-w-3xl">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <NotebookPen className="w-7 h-7" style={{ color: "#757575" }} />
          </div>
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: "#242424", fontFamily: '"Lora", serif' }}
          >
            No drafts yet
          </h2>
          <p
            className="text-sm max-w-sm"
            style={{ color: "#757575", fontFamily: '"Inter", sans-serif' }}
          >
            You don&apos;t have any drafts yet. Write your first story!
          </p>
        </div>
      </main>
    )
  }

  const draftCards = drafts.map(mapPostToBlogCard)

  return (
    <main className="flex-1 min-w-0 px-4 md:px-10 lg:px-16 max-w-3xl">
      <h1
        className="text-2xl font-bold py-6"
        style={{ color: "#242424", fontFamily: '"Lora", serif' }}
      >
        Drafts
      </h1>

      <div className="flex flex-col">
        {draftCards.map((post, index) => (
          <div key={post.id}>
            <BlogCard post={post} />
            {index < draftCards.length - 1 && (
              <div style={{ borderTop: "1px solid #E6E6E6" }} />
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
