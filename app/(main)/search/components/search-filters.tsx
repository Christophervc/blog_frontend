"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { ChevronDown, X, Clock, SearchX } from "lucide-react"
import { getCategories, getTags } from "@/features/feed/services/posts.service"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const DATE_PRESETS = [
  { label: "Any time", days: null },
  { label: "Last 24 hours", days: 1 },
  { label: "Last week", days: 7 },
  { label: "Last month", days: 30 },
] as const

interface SearchFiltersProps {
  categoryId?: string
  tagId?: string
  startDate?: string
  endDate?: string
  sortBy: string
  onFilterChange: (key: string, value: string | null) => void
  onSortChange: (value: string) => void
}

export function SearchFilters({
  categoryId,
  tagId,
  startDate,
  endDate,
  sortBy,
  onFilterChange,
  onSortChange,
}: SearchFiltersProps) {
  const activeDateLabel = startDate ? "Custom" : null
  const hasActiveFilters = !!(categoryId || tagId || startDate || endDate)

  const handleClear = () => {
    onFilterChange("categoryId", null)
    onFilterChange("tagId", null)
    onFilterChange("startDate", null)
    onFilterChange("endDate", null)
  }

  return (
    <div
      className="flex items-center flex-wrap gap-2 pb-4 mb-6"
      style={{ borderBottom: "1px solid #E6E6E6" }}
    >
      <CategoryFilter selectedId={categoryId} onChange={(id) => onFilterChange("categoryId", id)} />
      <TagFilter selectedId={tagId} onChange={(id) => onFilterChange("tagId", id)} />
      <AuthorFilter />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full text-sm transition-colors"
            style={{
              backgroundColor: startDate ? "#242424" : "#F2F2F2",
              color: startDate ? "#fff" : "#757575",
              fontFamily: '"Inter", sans-serif',
            }}
          >
            <Clock className="w-3.5 h-3.5" />
            {activeDateLabel ?? "Date"}
            <ChevronDown className="w-3 h-3" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {DATE_PRESETS.map((preset) => (
            <DropdownMenuItem
              key={preset.label}
              onClick={() => {
                if (!preset.days) {
                  onFilterChange("startDate", null)
                  onFilterChange("endDate", null)
                } else {
                  const date = new Date(Date.now() - preset.days * 86400000)
                  onFilterChange("startDate", date.toISOString())
                  onFilterChange("endDate", null)
                }
              }}
            >
              {preset.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="w-px h-6" style={{ backgroundColor: "#E6E6E6" }} />

      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger
          className="w-32 h-8 rounded-full text-sm"
          style={{ backgroundColor: "#F2F2F2", border: "none" }}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevance">Relevance</SelectItem>
          <SelectItem value="latest">Latest</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <button
          onClick={handleClear}
          className="inline-flex items-center gap-1 px-3 h-8 rounded-full text-sm transition-colors hover:bg-gray-100"
          style={{ color: "#757575", fontFamily: '"Inter", sans-serif' }}
        >
          <X className="w-3.5 h-3.5" />
          Clear filters
        </button>
      )}
    </div>
  )
}

function CategoryFilter({
  selectedId,
  onChange,
}: {
  selectedId?: string
  onChange: (id: string | null) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    enabled: isOpen,
    staleTime: 5 * 60 * 1000,
  })

  const selectedName = categories?.find((c) => c.id === selectedId)?.name

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full text-sm transition-colors"
          style={{
            backgroundColor: selectedId ? "#242424" : "#F2F2F2",
            color: selectedId ? "#fff" : "#757575",
            fontFamily: '"Inter", sans-serif',
          }}
        >
          {selectedId ? `Category: ${selectedName ?? "..."}` : "Category"}
          <ChevronDown className="w-3 h-3" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {isLoading ? (
          <DropdownMenuItem disabled>
            <span className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full animate-spin"
                style={{
                  border: "2px solid #E6E6E6",
                  borderTopColor: "#757575",
                }}
              />
              Loading...
            </span>
          </DropdownMenuItem>
        ) : (
          <>
            {selectedId && (
              <DropdownMenuItem onClick={() => onChange(null)}>
                Any category
              </DropdownMenuItem>
            )}
            {categories?.map((cat) => (
              <DropdownMenuItem
                key={cat.id}
                onClick={() => onChange(cat.id)}
                style={{
                  fontWeight: cat.id === selectedId ? 600 : 400,
                }}
              >
                {cat.name}
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function TagFilter({
  selectedId,
  onChange,
}: {
  selectedId?: string
  onChange: (id: string | null) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const { data: tags, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
    enabled: isOpen,
    staleTime: 5 * 60 * 1000,
  })

  const selectedName = tags?.find((t) => t.id === selectedId)?.name

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full text-sm transition-colors"
          style={{
            backgroundColor: selectedId ? "#242424" : "#F2F2F2",
            color: selectedId ? "#fff" : "#757575",
            fontFamily: '"Inter", sans-serif',
          }}
        >
          {selectedId ? `Tag: ${selectedName ?? "..."}` : "Tag"}
          <ChevronDown className="w-3 h-3" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {isLoading ? (
          <DropdownMenuItem disabled>
            <span className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full animate-spin"
                style={{
                  border: "2px solid #E6E6E6",
                  borderTopColor: "#757575",
                }}
              />
              Loading...
            </span>
          </DropdownMenuItem>
        ) : (
          <>
            {selectedId && (
              <DropdownMenuItem onClick={() => onChange(null)}>
                Any tag
              </DropdownMenuItem>
            )}
            {tags?.map((tag) => (
              <DropdownMenuItem
                key={tag.id}
                onClick={() => onChange(tag.id)}
                style={{
                  fontWeight: tag.id === selectedId ? 600 : 400,
                }}
              >
                {tag.name}
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function AuthorFilter() {
  return (
    <button
      disabled
      className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full text-sm cursor-not-allowed"
      style={{
        backgroundColor: "#F2F2F2",
        color: "#b0b0b0",
        fontFamily: '"Inter", sans-serif',
      }}
      title="Coming soon"
    >
      <SearchX className="w-3.5 h-3.5" />
      Author
    </button>
  )
}
