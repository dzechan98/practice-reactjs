import { Header } from "@/components/header";
import { SearchAndFilter } from "@/components/tasks/search-and-filter";
import { TaskForm } from "@/components/tasks/task-form";
import { TaskList } from "@/components/tasks/task-list";
import { TaskStats } from "@/components/tasks/task-stats";
import { useTasks } from "@/contexts/task-context";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";

export const HomePage: React.FC = () => {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !task.completed) ||
      (filter === "completed" && task.completed);

    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task?.description?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <>
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
        <TaskForm />
      </div>
      <Separator className="my-6" />
      <div className="transform transition-all duration-300">
        <TaskList tasks={filteredTasks} />
      </div>
    </>
  );
};
