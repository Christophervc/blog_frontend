"use client"

import { useEffect, useCallback, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, X } from "lucide-react"

import { useAuthStore } from "@/lib/store/authStore"
import { useCreatePost } from "@/features/feed/hooks/useCreatePost"
import { useUpdatePost } from "@/features/feed/hooks/useUpdatePost"
import { useDeletePostImage } from "@/features/feed/hooks/useDeletePostImage"
import { createPostSchema, type CreatePostFormData } from "@/lib/schemas/postSchema"
import type { CreatePostDTO, UpdatePostDTO } from "@/features/feed/types/published-posts.types"
import type { Image } from "@/features/feed/types/blog-detail.interface"

import { TiptapEditor } from "@/components/editor/TiptapEditor"
import { CategorySelect } from "@/components/forms/CategorySelect"
import { TagMultiSelect } from "@/components/forms/TagMultiSelect"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

function extractImagesFromContent(
  html: string,
  urlToPublicId: Map<string, string>,
  postTitle?: string
): NonNullable<CreatePostDTO["images"]> {
  const images: NonNullable<CreatePostDTO["images"]> = []
  const regex = /<img[^>]+src="([^">]+)"[^>]*\/?>/gi
  let match: RegExpExecArray | null

  while ((match = regex.exec(html)) !== null) {
    const url = match[1]
    images.push({
      url,
      publicId: urlToPublicId.get(url) ?? "",
      altText: postTitle || "",
      isCover: images.length === 0,
    })
  }

  return images
}

interface ExistingImageItem extends Image {
  deletePending?: boolean
}

interface PostFormProps {
  initialData?: CreatePostFormData
  postId?: string
  existingImages?: Image[]
}

export function PostForm({ initialData, postId, existingImages = [] }: PostFormProps) {
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const createPost = useCreatePost()
  const updatePost = useUpdatePost()
  const deleteImage = useDeletePostImage()
  const urlToPublicIdRef = useRef(new Map<string, string>())
  const [existingImagesState, setExistingImagesState] = useState<ExistingImageItem[]>(existingImages)
  const isEditMode = !!postId
  const isPending = createPost.isPending || updatePost.isPending

  const form = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
      categoryId: "",
      tagIds: [],
      status: "DRAFT",
    },
  })

  const watchedCategoryId = form.watch("categoryId")
  const effectiveCategoryId = initialData?.categoryId || watchedCategoryId

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (initialData) {
      form.reset(initialData)
    }
  }, [initialData, form])

  useEffect(() => {
    const map = urlToPublicIdRef.current
    existingImages.forEach((img) => {
      if (img.publicId && !map.has(img.url)) {
        map.set(img.url, img.publicId)
      }
    })
  }, [existingImages])

  const handleRemoveExistingImage = useCallback(
    (imageId: string) => {
      if (!postId) return

      setExistingImagesState((prev) =>
        prev.map((img) =>
          img.id === imageId ? { ...img, deletePending: true } : img
        )
      )

      deleteImage.mutate(
        { postId, imageId },
        {
          onSuccess: () => {
            setExistingImagesState((prev) => prev.filter((img) => img.id !== imageId))
            const removed = existingImagesState.find((img) => img.id === imageId)
            if (removed) {
              urlToPublicIdRef.current.delete(removed.url)
            }
          },
          onError: () => {
            toast.error("Failed to delete image. Please try again.")
            setExistingImagesState((prev) =>
              prev.map((img) =>
                img.id === imageId ? { ...img, deletePending: false } : img
              )
            )
          },
        }
      )
    },
    [postId, deleteImage, existingImagesState]
  )

  const handleSubmit = useCallback(
    async (status: "DRAFT" | "PUBLISHED") => {
      const isValid = await form.trigger()
      if (!isValid) return

      const data = form.getValues()
      const images = extractImagesFromContent(data.content, urlToPublicIdRef.current, data.title)

      const payload: CreatePostDTO = {
        title: data.title,
        content: data.content,
        categoryId: data.categoryId,
        tagIds: data.tagIds,
        status,
        images: images.length > 0 ? images : undefined,
      }

      if (isEditMode && postId) {
        updatePost.mutate(
          { id: postId, data: payload as UpdatePostDTO },
          {
            onSuccess: () => {
              toast.success(
                status === "PUBLISHED"
                  ? "Post published successfully!"
                  : "Draft saved successfully!"
              )
              router.push(`/posts/${postId}`)
            },
            onError: () => {
              toast.error("Failed to update post. Please try again.")
            },
          }
        )
      } else {
        createPost.mutate(payload, {
          onSuccess: () => {
            toast.success(
              status === "PUBLISHED"
                ? "Post published successfully!"
                : "Draft saved successfully!"
            )
            router.push(status === "PUBLISHED" ? "/" : "/drafts")
          },
          onError: () => {
            toast.error("Failed to create post. Please try again.")
          },
        })
      }
    },
    [form, createPost, updatePost, isEditMode, postId, router]
  )

  if (!isAuthenticated) return null

  return (
    <div className="max-w-3xl mx-auto px-4 pt-8 pb-20">
      {/* Existing images list */}
      {isEditMode && existingImagesState.length > 0 && (
        <div className="mb-8">
          <p className="text-sm font-medium mb-2" style={{ color: "#242424" }}>
            Post images
          </p>
          <div className="flex flex-wrap gap-3">
            {existingImagesState.map((img) => (
              <div
                key={img.id}
                className="relative group rounded-lg overflow-hidden border border-input"
                style={{ width: 120, height: 80 }}
              >
                <img
                  src={img.url}
                  alt={img.altText || "Post image"}
                  className="w-full h-full object-cover"
                />
                {img.isCover && (
                  <span className="absolute top-1 left-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-black/60 text-white">
                    Cover
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveExistingImage(img.id)}
                  disabled={img.deletePending}
                  className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 disabled:opacity-50"
                  aria-label="Remove image"
                >
                  {img.deletePending ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <X className="w-3 h-3" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center justify-end gap-3 mb-8">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isPending}
          onClick={() => handleSubmit("DRAFT")}
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {isEditMode ? "Save as Draft" : "Save Draft"}
        </Button>
        <Button
          type="button"
          size="sm"
          disabled={isPending}
          onClick={() => handleSubmit("PUBLISHED")}
          style={{ backgroundColor: "#242424" }}
          className="text-white hover:opacity-90"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {isEditMode ? "Update & Publish" : "Publish"}
        </Button>
      </div>

      <Form {...form}>
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormControl>
                <input
                  {...field}
                  placeholder="Title"
                  className="w-full text-4xl font-bold outline-none bg-transparent placeholder:text-[#757575]/50"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    color: "#242424",
                    border: "none",
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content (Tiptap) */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormControl>
                <TiptapEditor
                  value={field.value}
                  onChange={field.onChange}
                  onImageUploaded={({ url, publicId }) => {
                    urlToPublicIdRef.current.set(url, publicId)
                  }}
                  categoryId={effectiveCategoryId}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Category</FormLabel>
              <FormControl>
                <CategorySelect value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tags */}
        <FormField
          control={form.control}
          name="tagIds"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagMultiSelect value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </div>
  )
}
