import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPost } from "@/features/feed/services/posts.service"
import type { CreatePostDTO } from "@/features/feed/types/published-posts.types"
import type { Data as PostDetail } from "@/features/feed/types/blog-detail.interface"

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation<PostDetail, Error, CreatePostDTO>({
    mutationFn: (dto) => createPost(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drafts"] })
      queryClient.invalidateQueries({ queryKey: ["published-posts"] })
    },
  })
}
