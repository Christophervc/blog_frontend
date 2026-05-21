"use client"

import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Data as PostDetail } from "@/features/feed/types/blog-detail.interface"
import { PostDetail as PostDetailComponent } from "@/features/feed/components/PostDetail"

export default function PostPage() {
  const params = useParams()
  const slugWithId = params.slugWithId as string

  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  const postId = slugWithId?.match(uuidRegex)?.[0] ?? ""
  const { data: post, isLoading, isError } = useQuery<PostDetail>({
    queryKey: ["post", postId],
    queryFn: async () => {
      const { data } = await api.get<PostDetail>(`/posts/${postId}`)
      return data
    },
    enabled: !!postId,
  })

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200" />
            <div className="flex flex-col gap-2">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-48 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="h-10 w-3/4 bg-gray-200 rounded mt-4" />
          <div className="h-64 w-full bg-gray-200 rounded mt-6" />
          <div className="h-px w-full bg-gray-200 mt-6" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
          <div className="h-4 w-4/6 bg-gray-200 rounded" />
        </div>
      </div>
    )
  }

  if (isError || !post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p
          className="text-lg"
          style={{ color: "#757575", fontFamily: '"Inter", sans-serif' }}
        >
          Unable to load this article. Please try again later.
        </p>
      </div>
    )
  }

  return <PostDetailComponent post={post} />
}
