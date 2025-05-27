import React, { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { Task } from "@/types";
import { TaskPriority } from "@/types";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "@/hooks/useLocalStorage";

interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  addTask: (taskData: Omit<Task, "id" | "completed" | "createdAt">) => void;
  updateTask: (
    id: string,
    updates: Partial<Omit<Task, "id" | "createdAt">>
  ) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [
    {
      id: uuidv4(),
      title: "Sample Task 1",
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
      title: "Sample Task 2",
      priority: TaskPriority.High,
      category: "Personal",
      completed: true,
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  const addTask = (taskData: Omit<Task, "id" | "completed" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = (
    id: string,
    updates: Partial<Omit<Task, "id" | "createdAt">>
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        setTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
