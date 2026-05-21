import { useQuery } from "@tanstack/react-query"
import { getTags } from "@/features/feed/services/posts.service"

export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
    staleTime: 5 * 60 * 1000,
  })
}
