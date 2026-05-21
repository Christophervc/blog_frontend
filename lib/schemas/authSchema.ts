import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is mandatory"),
})

export type LoginFormData = z.infer<typeof loginSchema>
