"use client"

import { useParams } from "next/navigation"
import { usePostById } from "@/features/feed/hooks/use-post-by-id"
import { PostForm } from "@/components/forms/PostForm"
import { PostDetailSkeleton } from "@/features/feed/components/PostDetailSkeleton"
import type { CreatePostFormData } from "@/lib/schemas/postSchema"

export default function EditPostPage() {
  const params = useParams()
  const slugWithId = params.slugWithId as string

  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  const postId = slugWithId?.match(uuidRegex)?.[0] ?? ""

  const { data: post, isLoading, isError } = usePostById(postId)

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 pt-8">
        <PostDetailSkeleton />
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
          Unable to load this post for editing. It may not exist or you may not have permission to edit it.
        </p>
      </div>
    )
  }

  const formData: CreatePostFormData = {
    title: post.title,
    content: post.content,
    categoryId: post.category.id,
    tagIds: post.tags.map((t) => t.id),
    status: post.status as "DRAFT" | "PUBLISHED",
  }

  return (
    <PostForm
      initialData={formData}
      postId={post.id}
      existingImages={post.images}
    />
  )
}
