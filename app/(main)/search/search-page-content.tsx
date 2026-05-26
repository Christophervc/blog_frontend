"use client"

import { useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { SearchX } from "lucide-react"
import { useSearchPosts } from "@/features/feed/hooks/use-search-posts"
import { mapPostToBlogCard } from "@/features/feed/services/post-mapper"
import { BlogCard } from "@/features/feed/components/BlogCard"
import { SearchFilters } from "./components/search-filters"
import Link from "next/link"

function SearchSkeleton() {
  return (
    <div className="py-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="animate-pulse flex flex-col gap-3 mb-8">
          <div className="h-3 w-48 bg-gray-200 rounded" />
          <div className="h-5 w-full bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  )
}

export function SearchPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const q = searchParams.get("q") ?? ""
  const categoryId = searchParams.get("categoryId") ?? undefined
  const tagId = searchParams.get("tagId") ?? undefined
  const startDate = searchParams.get("startDate") ?? undefined
  const endDate = searchParams.get("endDate") ?? undefined
  const sortBy = searchParams.get("sort") ?? "relevance"

  const { data, isLoading, isError } = useSearchPosts(q, {
    categoryId,
    tagId,
    startDate,
    endDate,
  })
  const posts = data?.data ?? []

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.replace(`/search?${params.toString()}`)
    },
    [router, searchParams]
  )

  const handleSortChange = useCallback(
    (value: string) => {
      updateFilter("sort", value === "relevance" ? null : value)
    },
    [updateFilter]
  )

  if (!q) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <SearchX className="w-12 h-12 text-gray-300 mb-4" />
        <p
          className="text-lg"
          style={{ color: "#757575", fontFamily: '"Inter", sans-serif' }}
        >
          no results found for
        </p>
      </div>
    )
  }

  if (isLoading) {
    return <SearchSkeleton />
  }

  if (isError) {
    return (
      <p
        className="text-sm text-center py-12"
        style={{ color: "#757575", fontFamily: '"Inter", sans-serif' }}
      >
        Unable to load results. Please try again later.
      </p>
    )
  }

  return (
    <div className="py-8">
      <h1
        className="text-2xl md:text-3xl font-bold mb-6"
        style={{ fontFamily: '"Inter", sans-serif', color: "#242424" }}
      >
        Results for <strong>{q}</strong>
      </h1>

      <SearchFilters
        categoryId={categoryId}
        tagId={tagId}
        startDate={startDate}
        endDate={endDate}
        sortBy={sortBy}
        onFilterChange={updateFilter}
        onSortChange={handleSortChange}
      />

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <SearchX className="w-12 h-12 text-gray-300 mb-4" />
          <p
            className="text-lg"
            style={{ color: "#757575", fontFamily: '"Inter", sans-serif' }}
          >
            no results found for &ldquo;{q}&rdquo;
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          {posts.map((post, index) => (
            <div key={post.id}>
              <Link href={`/posts/${post.slug}-${post.id}`}>
                <BlogCard post={mapPostToBlogCard(post)} />
              </Link>
              {index < posts.length - 1 && (
                <div style={{ borderTop: "1px solid #E6E6E6" }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
