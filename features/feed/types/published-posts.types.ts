export interface PublishedPostsCursorResponse {
  data: PublishedPostCard[]
  nextCursor: string | null
  hasNextPage: boolean
}

export interface PublishedPostCard {
  id: string
  title: string
  slug: string
  excerpt: string
  author: { id: string; name: string }
  category: { id: string; name: string }
  tags: { id: string; name: string }[]
  readingTime: number
  createdAt: string
  updatedAt: string
  images: { id: string; url: string; altText: string; isCover: boolean }[]
}

export interface CreatePostDTO {
  title: string
  content: string
  excerpt?: string
  categoryId: string
  tagIds: string[]
  images?: { url: string; publicId: string; altText?: string; isCover?: boolean }[]
  status: "DRAFT" | "PUBLISHED"
}

export interface UploadMediaResponse {
  url: string
  publicId: string
}
