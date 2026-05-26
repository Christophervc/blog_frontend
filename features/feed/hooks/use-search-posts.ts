import { useQuery } from "@tanstack/react-query"
import { getPublishedPosts } from "@/features/feed/services/posts.service"
import type { PublishedPostsCursorResponse } from "@/features/feed/types/published-posts.types"

export interface SearchFilters {
  categoryId?: string
  tagId?: string
  authorId?: string
  startDate?: string
  endDate?: string
}

export function useSearchPosts(keyword: string, filters?: SearchFilters) {
  return useQuery<PublishedPostsCursorResponse>({
    queryKey: [
      "search-posts",
      keyword,
      filters?.categoryId ?? null,
      filters?.tagId ?? null,
      filters?.authorId ?? null,
      filters?.startDate ?? null,
      filters?.endDate ?? null,
    ],
    queryFn: () => getPublishedPosts({ keyword, limit: 20, ...filters }),
    enabled: !!keyword,
  })
}
