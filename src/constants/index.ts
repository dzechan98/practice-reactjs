import type { Task } from "@/types";

export const initialTasks: Task[] = [
  {
    id: "1",
    title: "Complete React project documentation",
    description: "Write comprehensive documentation for the task manager app",
    completed: false,
    priority: "high",
    category: "Work",
    dueDate: "2024-01-15",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Review pull requests",
    description: "Review and merge pending pull requests",
    completed: true,
    priority: "medium",
    category: "Work",
    dueDate: "2024-01-10",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Buy groceries",
    description: "Milk, bread, eggs, and vegetables",
    completed: false,
    priority: "low",
    category: "Personal",
    dueDate: "2024-01-12",
    createdAt: new Date(),
  },
];
