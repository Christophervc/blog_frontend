import { useQuery } from "@tanstack/react-query"
import { getCategories } from "@/features/feed/services/posts.service"

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
  })
}
