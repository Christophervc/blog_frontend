import { z } from "zod"

export const createPostSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must not exceed 200 characters"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(50000, "Content must not exceed 50,000 characters"),
  categoryId: z.string().uuid("Invalid category ID"),
  tagIds: z.array(z.string().uuid()).max(10, "Maximum 10 tags allowed"),
  status: z.enum(["PUBLISHED", "DRAFT"]),
  images: z
    .array(
      z.object({
        url: z.string().url(),
        publicId: z.string().optional(),
        altText: z.string().optional(),
        isCover: z.boolean().optional(),
      })
    )
    .max(10, "Maximum 10 images allowed")
    .optional()
    .default([]),
})

export type CreatePostFormData = z.infer<typeof createPostSchema>
