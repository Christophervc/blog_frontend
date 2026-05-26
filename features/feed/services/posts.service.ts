import { api } from "@/lib/api"
import type { PublishedPostsCursorResponse, PublishedPostCard, CreatePostDTO, UpdatePostDTO, UploadMediaResponse } from "@/features/feed/types/published-posts.types"
import type { Data as PostDetail } from "@/features/feed/types/blog-detail.interface"

export interface GetPublishedPostsParams {
  cursor?: string
  limit?: number
  keyword?: string
  categoryId?: string
  tagId?: string
  authorId?: string
  startDate?: string
  endDate?: string
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

export async function getDrafts() {
  const { data } = await api.get<PublishedPostCard[]>("/posts/drafts")
  return data
}

export async function getDraftById(id: string) {
  const { data } = await api.get<PostDetail>(`/posts/${id}`)
  return data
}

export async function getCategories() {
  const { data } = await api.get<{ id: string; name: string }[]>("/categories")
  return data
}

export async function getTags() {
  const { data } = await api.get<{ id: string; name: string }[]>("/tags")
  return data
}

export async function uploadMedia(file: File, folder: string) {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("folder", folder)
  const { data } = await api.post<UploadMediaResponse>("/media/upload", formData, {
    headers: { "Content-Type": undefined },
  })
  return data
}

export async function createPost(dto: CreatePostDTO) {
  const { data } = await api.post<PostDetail>("/posts", dto)
  return data
}

export async function deletePost(id: string) {
  const { data } = await api.delete<{ message: string }>(`/posts/${id}`)
  return data
}

export async function updatePost(id: string, data: UpdatePostDTO) {
  const { data: response } = await api.put<PostDetail>(`/posts/${id}`, data)
  return response
}

export async function deletePostImage(postId: string, imageId: string) {
  await api.delete(`/media/${postId}/images/${imageId}`)
}
