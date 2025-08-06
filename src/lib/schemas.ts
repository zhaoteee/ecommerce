import { z } from "zod";

export const CategoryFormSchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters long.")
    .max(50, "Category name cannot be exceed 50 characters.")
    .regex(
      /^[a-zA-Z0-9\s]+$/,
      "Only letters, numbers, and spaces are allowed in the category name."
    ),
  image: z
    .object({ url: z.string() })
    .array()
    .length(1, "Choose a category image"),
  url: z
    .string()
    .min(2, "Category url must be at least 2 characters long.")
    .max(50, "Category name cannot be exceed 50 characters.")
    .regex(
      /^(?!.*(?:[-_]){2,})[a-zA-Z0-9_-]+$/,
      "Only letters, numbers, and spaces are allowed in the category url."
    ),
  featured: z.boolean(),
});
