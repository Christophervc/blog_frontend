"use client"

import { useCategories } from "@/features/feed/hooks/useCategories"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CategorySelectProps {
  value: string
  onChange: (value: string) => void
}

export function CategorySelect({ value, onChange }: CategorySelectProps) {
  const { data: categories, isLoading, isError } = useCategories()

  const isDisabled = isLoading || isError || !categories || categories.length === 0

  const placeholderText = (() => {
    if (isLoading) return "Loading categories..."
    if (isError) return "Unable to load categories"
    if (!categories || categories.length === 0) return "No categories available"
    return "Select a category"
  })()

  return (
    <Select value={value} onValueChange={onChange} disabled={isDisabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholderText} />
      </SelectTrigger>
      <SelectContent>
        {categories?.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
