import { useQuery } from "@tanstack/react-query"
import { getDraftById } from "@/features/feed/services/posts.service"
import type { Data as PostDetail } from "@/features/feed/types/blog-detail.interface"

export function useDraft(id: string) {
  return useQuery<PostDetail>({
    queryKey: ["draft", id],
    queryFn: () => getDraftById(id),
    enabled: !!id,
  })
}
