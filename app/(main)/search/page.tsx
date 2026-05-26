import { Suspense } from "react"
import { SearchPageContent } from "./search-page-content"

function SearchSkeleton() {
  return (
    <div className="flex-1 min-w-0 px-4 md:px-10 lg:px-16 max-w-4xl mx-auto py-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="animate-pulse flex flex-col gap-3 mb-8">
          <div className="h-3 w-48 bg-gray-200 rounded" />
          <div className="h-5 w-full bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="flex-1 min-w-0 px-4 md:px-10 lg:px-16 max-w-4xl mx-auto">
      <Suspense fallback={<SearchSkeleton />}>
        <SearchPageContent />
      </Suspense>
    </div>
  )
}
