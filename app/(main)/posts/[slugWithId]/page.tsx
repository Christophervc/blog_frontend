"use client"

import { useParams } from "next/navigation"
import { usePostById } from "@/features/feed/hooks/use-post-by-id"
import { PostDetail as PostDetailComponent } from "@/features/feed/components/PostDetail"
import { PostDetailSkeleton } from "@/features/feed/components/PostDetailSkeleton"

export default function PostPage() {
  const params = useParams()
  const slugWithId = params.slugWithId as string

  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  const postId = slugWithId?.match(uuidRegex)?.[0] ?? ""

  const { data: post, isLoading, isError } = usePostById(postId)

  if (isLoading) {
    return <PostDetailSkeleton />
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
