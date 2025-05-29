import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { Task } from "@/types";
import { TaskPriority } from "@/types";

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [
    {
      id: uuidv4(),
      title: "Sample Task 1 (Redux Persisted)",
      description: "This is a sample task description.",
      priority: TaskPriority.Medium,
      category: "Work",
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      title: "Sample Task 2 (Redux Persisted)",
      priority: TaskPriority.High,
      category: "Personal",
      completed: true,
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    },
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<Omit<Task, "id" | "completed" | "createdAt">>
    ) => {
      const newTask: Task = {
        ...action.payload,
        id: uuidv4(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
    },
    updateTask: (
      state,
      action: PayloadAction<{
        id: string;
        updates: Partial<Omit<Task, "id" | "createdAt">>;
      }>
    ) => {
      const { id, updates } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
  setTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
