import { TaskPriority } from "@/types";
import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  priority: z.nativeEnum(TaskPriority, {
    errorMap: () => ({ message: "Please select a priority" }),
  }),
  category: z.string().min(1, "Please select a category"),
  dueDate: z
    .string()
    .min(1, "Due date is required")
    .refine((date) => {
      if (!date) return true;
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, "Due date cannot be in the past"),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export const defaultValues: TaskFormData = {
  title: "",
  description: "",
  priority: TaskPriority.Medium,
  category: "Personal",
  dueDate: "",
};
