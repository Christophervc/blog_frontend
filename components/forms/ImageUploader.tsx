"use client"

import { useRef } from "react"
import { useUploadMedia } from "@/features/feed/hooks/useUploadMedia"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImagePlus, X, Loader2, Star } from "lucide-react"
import Image from "next/image"

export interface ImageItem {
  url: string
  publicId?: string
  altText?: string
  isCover?: boolean
}

interface ImageUploaderProps {
  value: ImageItem[]
  onChange: (value: ImageItem[]) => void
  postTitle?: string
}

export function ImageUploader({ value, onChange, postTitle }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadMedia = useUploadMedia()
  const isFull = value.length >= 10

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    uploadMedia.mutate(
      { file, folder: "posts" },
      {
        onSuccess: (result) => {
          const newImage: ImageItem = {
            url: result.url,
            publicId: result.publicId,
            isCover: value.length === 0,
            altText: postTitle || "",
          }
          onChange([...value, newImage])
        },
      }
    )

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  function removeImage(index: number) {
    const newList = value.filter((_, i) => i !== index)

    if (newList.length > 0) {
      newList[0].isCover = true
    }

    onChange(newList)
  }

  function updateAltText(index: number, altText: string) {
    const newList = value.map((img, i) =>
      i === index ? { ...img, altText } : img
    )
    onChange(newList)
  }

  return (
    <div className="space-y-4">
      {/* Upload button */}
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isFull || uploadMedia.isPending}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploadMedia.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ImagePlus className="w-4 h-4" />
          )}
          {uploadMedia.isPending ? "Uploading..." : "Upload Image"}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
          disabled={uploadMedia.isPending}
        />
        {isFull && (
          <span className="text-xs" style={{ color: "#757575" }}>
            Maximum 10 images reached
          </span>
        )}
        {value.length > 0 && !isFull && (
          <span className="text-xs" style={{ color: "#757575" }}>
            {value.length}/10 images
          </span>
        )}
      </div>

      {/* Image list */}
      {value.length === 0 && (
        <p className="text-sm" style={{ color: "#757575" }}>
          No images uploaded yet.
        </p>
      )}

      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {value.map((image, index) => (
            <div
              key={image.publicId ?? image.url}
              className="relative group rounded-lg overflow-hidden border border-input bg-gray-50"
            >
              {/* Thumbnail */}
              <div className="aspect-[16/9] relative bg-gray-100">
                <Image
                  src={image.url}
                  alt={image.altText ?? "Uploaded image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Cover badge — first image is always the cover */}
                {index === 0 && (
                  <div className="absolute top-1 left-1">
                    <div
                      className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium text-white"
                      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                    >
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      Cover
                    </div>
                  </div>
                )}
                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                  aria-label="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Controls */}
              <div className="p-2">
                <Input
                  placeholder="Alt text (SEO)..."
                  value={image.altText ?? ""}
                  onChange={(e) => updateAltText(index, e.target.value)}
                  className="h-7 text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
