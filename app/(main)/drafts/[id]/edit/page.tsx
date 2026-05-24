"use client"

import { useParams } from "next/navigation"
import { useDraft } from "@/features/feed/hooks/use-draft"
import { PostForm } from "@/components/forms/PostForm"
import { PostDetailSkeleton } from "@/features/feed/components/PostDetailSkeleton"
import type { CreatePostFormData } from "@/lib/schemas/postSchema"

export default function EditDraftPage() {
  const params = useParams()
  const id = params.id as string

  const { data: draft, isLoading, isError } = useDraft(id)

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 pt-8">
        <PostDetailSkeleton />
      </div>
    )
  }

  if (isError || !draft) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p
          className="text-lg"
          style={{ color: "#757575", fontFamily: '"Inter", sans-serif' }}
        >
          Unable to load this draft for editing. It may not exist or you may not have permission to edit it.
        </p>
      </div>
    )
  }

  const formData: CreatePostFormData = {
    title: draft.title,
    content: draft.content,
    categoryId: draft.category.id,
    tagIds: draft.tags.map((t) => t.id),
    status: draft.status as "DRAFT" | "PUBLISHED",
  }

  return (
    <PostForm
      initialData={formData}
      postId={draft.id}
      existingImages={draft.images}
    />
  )
}
