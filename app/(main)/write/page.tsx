"use client"

import { useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { useAuthStore } from "@/lib/store/authStore"
import { useCreatePost } from "@/features/feed/hooks/useCreatePost"
import { createPostSchema, type CreatePostFormData } from "@/lib/schemas/postSchema"
import type { CreatePostDTO } from "@/features/feed/types/published-posts.types"

import { TiptapEditor } from "@/components/editor/TiptapEditor"
import { CategorySelect } from "@/components/forms/CategorySelect"
import { TagMultiSelect } from "@/components/forms/TagMultiSelect"
import { ImageUploader } from "@/components/forms/ImageUploader"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

export default function WritePage() {
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const createPost = useCreatePost()

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

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, router])

  const handleSubmit = useCallback(
    async (status: "DRAFT" | "PUBLISHED") => {
      const isValid = await form.trigger()
      if (!isValid) return

      const data = form.getValues()

      const dto: CreatePostDTO = {
        title: data.title,
        content: data.content,
        categoryId: data.categoryId,
        tagIds: data.tagIds,
        status,
        images: data.images as CreatePostDTO["images"],
      }

      createPost.mutate(dto, {
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
    },
    [form, createPost, router]
  )

  if (!isAuthenticated) return null

  return (
    <div className="max-w-3xl mx-auto px-4 pt-8 pb-20">
      {/* Action buttons */}
      <div className="flex items-center justify-end gap-3 mb-8">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={createPost.isPending}
          onClick={() => handleSubmit("DRAFT")}
        >
          {createPost.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : null}
          Save Draft
        </Button>
        <Button
          type="button"
          size="sm"
          disabled={createPost.isPending}
          onClick={() => handleSubmit("PUBLISHED")}
          style={{
            backgroundColor: "#242424",
          }}
          className="text-white hover:opacity-90"
        >
          {createPost.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : null}
          Publish
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
                    fontFamily: '"Lora", serif',
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
                <TiptapEditor value={field.value} onChange={field.onChange} />
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

        {/* Images */}
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Images</FormLabel>
              <FormControl>
                <ImageUploader value={field.value ?? []} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </div>
  )
}
