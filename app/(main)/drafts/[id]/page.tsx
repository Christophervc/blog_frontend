"use client"

import { useParams } from "next/navigation"
import { useDraft } from "@/features/feed/hooks/use-draft"
import { PostDetail } from "@/features/feed/components/PostDetail"
import { PostDetailSkeleton } from "@/features/feed/components/PostDetailSkeleton"

export default function DraftDetailPage() {
  const params = useParams()
  const id = params.id as string

  const { data: draft, isLoading, isError } = useDraft(id)

  if (isLoading) {
    return <PostDetailSkeleton />
  }

  if (isError || !draft) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p
          className="text-lg"
          style={{ color: "#757575", fontFamily: '"Inter", sans-serif' }}
        >
          Unable to load this draft. It may not exist or you may not have permission to view it.
        </p>
      </div>
    )
  }

  return <PostDetail post={draft} />
}
