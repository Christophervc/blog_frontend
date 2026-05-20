import type { BlogPost } from "@/features/feed/types"
import type { PublishedPostCard } from "@/features/feed/types/published-posts.types"

export function mapPostToBlogCard(post: PublishedPostCard): BlogPost {
  const coverImage = post.images.find((img) => img.isCover)?.url

  return {
    id: post.id,
    publication: post.category.name,
    author: post.author.name,
    date: formatRelativeDate(post.createdAt),
    title: post.title,
    excerpt: post.excerpt,
    coverImage,
    claps: "0",
    comments: "0",
    isPremium: false,
    readTime: `${post.readingTime} min read`,
  }
}

function formatRelativeDate(dateStr: string): string {
  const now = Date.now()
  const date = new Date(dateStr).getTime()
  const diffMs = now - date
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30)

  if (diffSecs < 60) return "just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffWeeks < 5) return `${diffWeeks}w ago`
  if (diffMonths < 12) return `${diffMonths}mo ago`
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" })
}
