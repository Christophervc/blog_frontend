import { ThumbsUp, MessageSquare, Bookmark, Star, MoveHorizontal as MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { BlogPost } from "@/features/feed/types"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="py-6">
      <div className="flex items-center gap-2 mb-3">
        <Avatar className="w-5 h-5">
          <AvatarImage src={post.authorAvatar} alt={post.author} />
          <AvatarFallback
            className="text-[9px] font-bold"
            style={{ backgroundColor: "#F2F2F2", color: "#242424" }}
          >
            {post.author.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <p
          className="text-xs leading-none"
          style={{ color: "#757575", fontFamily: '"Inter", sans-serif' }}
        >
          <span>In </span>
          <button className="font-medium hover:underline" style={{ color: "#242424" }}>
            {post.publication}
          </button>
          <span> by </span>
          <button className="hover:underline">{post.author}</button>
          <span> · {post.date}</span>
        </p>
      </div>

      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0 pr-2">
          <h2
            className="font-bold text-xl leading-tight mb-2"
            style={{
              fontFamily: '"Lora", serif',
              color: "#242424",
              lineHeight: "1.3",
            }}
          >
            {post.title}
          </h2>
          <p
            className="text-sm leading-relaxed line-clamp-2"
            style={{
              color: "#757575",
              fontFamily: '"Inter", sans-serif',
              lineHeight: "1.5",
            }}
          >
            {post.excerpt}
          </p>
        </div>

        {post.coverImage && (
          <div className="shrink-0 w-[112px] md:w-[140px]">
            <div className="w-full aspect-[16/9] rounded-sm overflow-hidden bg-gray-100">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center gap-4 flex-1">
          {post.isPremium && (
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 shrink-0" />
          )}

          <button
            className="flex items-center gap-1.5 hover:text-[#242424] transition-colors"
            style={{ color: "#757575" }}
          >
            <ThumbsUp className="w-4 h-4" />
            <span
              className="text-xs"
              style={{ fontFamily: '"Inter", sans-serif', color: "#757575" }}
            >
              {post.claps}
            </span>
          </button>

          <button
            className="flex items-center gap-1.5 hover:text-[#242424] transition-colors"
            style={{ color: "#757575" }}
          >
            <MessageSquare className="w-4 h-4" />
            <span
              className="text-xs"
              style={{ fontFamily: '"Inter", sans-serif', color: "#757575" }}
            >
              {post.comments}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Save"
          >
            <Bookmark className="w-4 h-4" style={{ color: "#757575" }} />
          </button>
          <button
            className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="More options"
          >
            <MoreHorizontal className="w-4 h-4" style={{ color: "#757575" }} />
          </button>
        </div>
      </div>
    </article>
  )
}
