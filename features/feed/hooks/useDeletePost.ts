import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { deletePost } from "@/features/feed/services/posts.service"

interface UseDeletePostOptions {
  isDraft: boolean
}

export function useDeletePost({ isDraft }: UseDeletePostOptions) {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: (_data, id) => {
      toast.success("Post deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["published-posts"] })
      queryClient.invalidateQueries({ queryKey: ["drafts"] })
      queryClient.invalidateQueries({ queryKey: ["post", id] })
      queryClient.invalidateQueries({ queryKey: ["draft", id] })
      router.push(isDraft ? "/drafts" : "/")
    },
  })
}
