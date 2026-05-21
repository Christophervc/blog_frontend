import { api } from "@/lib/api"
import type { PublishedPostsCursorResponse } from "@/features/feed/types/published-posts.types"
import type { Data as PostDetail } from "@/features/feed/types/blog-detail.interface"

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

export async function getPostBySlug(slug: string) {
  const { data } = await api.get<PostDetail>(`/posts/${slug}`)
  return data
}

export async function getPostById(id: string) {
  const { data } = await api.get<PostDetail>(`/posts/${id}`)
  return data
}
