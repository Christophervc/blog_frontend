import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import type { Data as PostDetail } from "@/features/feed/types/blog-detail.interface"

interface PostDetailProps {
  post: PostDetail
}

export function PostDetail({ post }: PostDetailProps) {
  const coverImage = post.images.find((img) => img.isCover)
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const authorInitial = post.author.name.charAt(0).toUpperCase()

  return (
    <article className="max-w-2xl mx-auto px-4 py-8 md:py-12">
      {/* Author metadata */}
      <div className="flex items-center gap-3 mb-8">
        <Avatar className="w-12 h-12">
          <AvatarFallback
            className="text-lg font-bold"
            style={{ backgroundColor: "#F2F2F2", color: "#242424" }}
          >
            {authorInitial}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span
            className="text-sm font-medium"
            style={{ color: "#242424", fontFamily: '"Inter", sans-serif' }}
          >
            {post.author.name}
          </span>
          <div
            className="flex items-center gap-1 text-xs"
            style={{ color: "#757575", fontFamily: '"Inter", sans-serif' }}
          >
            <span>{formattedDate}</span>
            <span>·</span>
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <h1
        className="text-3xl md:text-4xl font-bold leading-tight mb-8"
        style={{
          fontFamily: '"Lora", serif',
          color: "#242424",
          lineHeight: "1.2",
        }}
      >
        {post.title}
      </h1>

      {/* Cover image */}
      {coverImage && (
        <div className="mb-8 rounded-sm overflow-hidden bg-gray-100">
          <Image
            src={coverImage.url}
            alt={coverImage.altText || post.title}
            width={1200}
            height={630}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}

      {/* Divider */}
      <div className="mb-8" style={{ borderTop: "1px solid #E6E6E6" }} />

      {/* Content */}
      <div
        className="prose prose-lg max-w-none"
        style={{
          fontFamily: '"Inter", sans-serif',
          color: "#242424",
          lineHeight: "1.8",
          fontSize: "1.125rem",
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      {post.tags.length > 0 && (
        <>
          <div className="mt-12 mb-6" style={{ borderTop: "1px solid #E6E6E6" }} />
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors hover:bg-gray-200"
                style={{
                  backgroundColor: "#F2F2F2",
                  color: "#242424",
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </>
      )}

      {/* Category */}
      <div className="mt-6 flex items-center gap-2">
        <span
          className="text-xs font-medium px-3 py-1.5 rounded-full"
          style={{
            backgroundColor: "#F2F2F2",
            color: "#242424",
            fontFamily: '"Inter", sans-serif',
          }}
        >
          {post.category.name}
        </span>
      </div>
    </article>
  )
}
