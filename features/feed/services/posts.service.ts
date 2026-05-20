import { api } from "@/lib/api"
import type { PublishedPostsCursorResponse } from "@/features/feed/types/published-posts.types"

export interface GetPublishedPostsParams {
  cursor?: string
  limit?: number
}

export async function getPublishedPosts(params?: GetPublishedPostsParams) {
  const { data } = await api.get<PublishedPostsCursorResponse>("/posts/published", {
    params,
  })
  return data
}
