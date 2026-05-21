export function PostDetailSkeleton() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-3 w-48 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="h-10 w-3/4 bg-gray-200 rounded mt-4" />
        <div className="h-64 w-full bg-gray-200 rounded mt-6" />
        <div className="h-px w-full bg-gray-200 mt-6" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
        <div className="h-4 w-4/6 bg-gray-200 rounded" />
      </div>
    </div>
  )
}
