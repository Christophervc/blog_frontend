import { useMutation } from "@tanstack/react-query"
import { uploadMedia } from "@/features/feed/services/posts.service"

export function useUploadMedia() {
  return useMutation({
    mutationFn: ({ file, folder }: { file: File; folder: string }) =>
      uploadMedia(file, folder),
  })
}
