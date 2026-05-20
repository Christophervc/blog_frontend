import { useInfiniteQuery } from "@tanstack/react-query"
import { getPublishedPosts } from "@/features/feed/services/posts.service"
import type { PublishedPostsCursorResponse } from "@/features/feed/types/published-posts.types"

export function usePublishedPosts() {
  return useInfiniteQuery<PublishedPostsCursorResponse>({
    queryKey: ["published-posts"],
    queryFn: ({ pageParam }) =>
      getPublishedPosts({ cursor: pageParam as string | undefined }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : undefined,
  })
}
