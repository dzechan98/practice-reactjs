export enum TaskPriority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  category: string;
  dueDate?: string;
  completed: boolean;
  createdAt: string;
}
