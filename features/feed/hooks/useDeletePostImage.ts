import { useMutation } from "@tanstack/react-query"
import { deletePostImage } from "@/features/feed/services/posts.service"

export function useDeletePostImage() {
  return useMutation({
    mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) =>
      deletePostImage(postId, imageId),
  })
}
