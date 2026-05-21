import { useQuery } from "@tanstack/react-query"
import { getDrafts } from "@/features/feed/services/posts.service"
import type { PublishedPostCard } from "@/features/feed/types/published-posts.types"

export function useDrafts() {
  return useQuery<PublishedPostCard[]>({
    queryKey: ["drafts"],
    queryFn: getDrafts,
  })
}
