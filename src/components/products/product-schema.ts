import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  price: z
    .number()
    .min(0.01, "Price must be greater than 0")
    .max(10000, "Price must be less than $10,000"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be less than 1000 characters"),
  category: z.string().min(1, "Please select a category"),
  image: z
    .string()
    .min(1, "Image URL is required")
    .url("Please enter a valid URL"),
  rating: z
    .object({
      rate: z
        .number()
        .min(0, "Rating must be at least 0")
        .max(5, "Rating must be at most 5"),
      count: z.number().min(0, "Rating count must be at least 0"),
    })
    .optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;

export const defaultValues: ProductFormData = {
  title: "",
  price: 0,
  description: "",
  category: "",
  image: "",
  rating: {
    rate: 0,
    count: 0,
  },
};
