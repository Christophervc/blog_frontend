import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePost } from "@/features/feed/services/posts.service"
import type { UpdatePostDTO } from "@/features/feed/types/published-posts.types"

export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostDTO }) =>
      updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["published-posts"] })
      queryClient.invalidateQueries({ queryKey: ["drafts"] })
    },
  })
}
