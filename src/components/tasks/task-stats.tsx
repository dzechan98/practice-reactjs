import { Check, Star, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Task } from "@/types";

interface TaskStatsProps {
  tasks: Task[];
}

export const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "high" && !task.completed
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-in-from-bottom">
      <Card className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 dark:bg-green-800 rounded-full">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                {completedTasks}
              </p>
              <p className="text-sm font-medium text-green-600 dark:text-green-500">
                Completed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-800 rounded-full">
              <Star className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-700 dark:text-orange-400">
                {highPriorityTasks}
              </p>
              <p className="text-sm font-medium text-orange-600 dark:text-orange-500">
                High Priority
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-full">
              <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                {tasks.length}
              </p>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-500">
                Total Tasks
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
