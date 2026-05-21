import { useQuery } from "@tanstack/react-query"
import { getPostById } from "@/features/feed/services/posts.service"
import type { Data as PostDetail } from "@/features/feed/types/blog-detail.interface"

export function usePostById(id: string) {
  return useQuery<PostDetail>({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  })
}
