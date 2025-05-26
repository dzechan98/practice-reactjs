import { useState, useEffect } from "react";
import type { Task } from "./types";
import { Separator } from "@/components/ui/separator";
import { initialTasks } from "@/constants";
import { Header } from "@/components/header";
import { TaskStats } from "@/components/tasks/task-stats";
import { SearchAndFilter } from "@/components/tasks/search-and-filter";
import { TaskForm } from "@/components/tasks/task-form";
import { TaskList } from "@/components/tasks/task-list";
import { ThemeToggle } from "@/components/theme-toggle";

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error("Error loading tasks from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const addTask = (newTask: Omit<Task, "id" | "createdAt">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTasks((prev) => [task, ...prev]);
  };

  const toggleTaskComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !task.completed) ||
      (filter === "completed" && task.completed);

    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "dark bg-slate-900" : "bg-gray-50"
      }`}
    >
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
            Task Manager Pro
          </h1>
          <ThemeToggle darkMode={darkMode} onToggle={setDarkMode} />
        </div>

        <div className="transform transition-all duration-500 hover:scale-[1.02]">
          <Header
            userName="Developer"
            taskCount={tasks.length}
            completedCount={completedCount}
          />
        </div>

        <div className="transform transition-all duration-500 hover:scale-[1.01]">
          <TaskStats tasks={tasks} />
        </div>

        <div className="mb-6 transform transition-all duration-300">
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filter={filter}
            onFilterChange={setFilter}
          />
        </div>

        <div className="mb-6 transform transition-all duration-300">
          <TaskForm onAddTask={addTask} />
        </div>

        <Separator className="my-6" />

        <div className="transform transition-all duration-300">
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={toggleTaskComplete}
            onDeleteTask={deleteTask}
            onEditTask={editTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
