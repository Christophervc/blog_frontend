"use client"

import { useState, useRef, useEffect } from "react"
import { useTags } from "@/features/feed/hooks/useTags"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { X, Loader2 } from "lucide-react"

interface TagMultiSelectProps {
  value: string[]
  onChange: (value: string[]) => void
}

export function TagMultiSelect({ value, onChange }: TagMultiSelectProps) {
  const { data: tags, isLoading, isError } = useTags()
  const [inputValue, setInputValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredTags =
    tags?.filter(
      (tag) =>
        !value.includes(tag.id) &&
        tag.name.toLowerCase().includes(inputValue.toLowerCase())
    ) ?? []

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function addTag(tagId: string) {
    if (value.length >= 10) return
    onChange([...value, tagId])
    setInputValue("")
  }

  function removeTag(tagId: string) {
    onChange(value.filter((id) => id !== tagId))
  }

  const selectedTags = tags?.filter((tag) => value.includes(tag.id)) ?? []
  const isFull = value.length >= 10

  if (isError) {
    return (
      <p className="text-sm" style={{ color: "#757575" }}>
        Unable to load tags.
      </p>
    )
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Selected tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {selectedTags.map((tag) => (
            <Badge key={tag.id} variant="secondary" className="gap-1 pl-2 pr-1">
              {tag.name}
              <button
                type="button"
                onClick={() => removeTag(tag.id)}
                className="ml-0.5 rounded-full hover:bg-gray-300 transition-colors p-0.5"
                aria-label={`Remove ${tag.name}`}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="relative">
        {isLoading ? (
          <div className="flex items-center gap-2 h-8 px-2.5 rounded-lg border border-input bg-transparent">
            <Loader2 className="w-4 h-4 animate-spin" style={{ color: "#757575" }} />
            <span className="text-sm" style={{ color: "#757575" }}>
              Loading tags...
            </span>
          </div>
        ) : (
          <Input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={isFull ? "Maximum 10 tags reached" : "Search tags..."}
            disabled={isFull}
          />
        )}

        {/* Dropdown */}
        {isOpen && !isLoading && filteredTags.length > 0 && (
          <div
            className="absolute z-50 mt-1 w-full rounded-lg border border-input bg-white shadow-md overflow-hidden"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {filteredTags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => {
                  addTag(tag.id)
                  setIsOpen(false)
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                style={{ color: "#242424", fontFamily: '"Inter", sans-serif' }}
              >
                {tag.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
