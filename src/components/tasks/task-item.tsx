import { useState } from "react";
import { Edit3, Trash2, Calendar, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { TaskPriority, type Task } from "@/types";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, updates: Partial<Task>) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleEdit = () => {
    if (editTitle.trim()) {
      onEditTask(task.id, { title: editTitle });
      setIsEditing(false);
    }
  };

  const getPriorityStyles = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.High:
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
      case TaskPriority.Medium:
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800";
      case TaskPriority.Low:
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
    }
  };

  return (
    <Card
      className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-4 ${
        task.completed
          ? "opacity-75 border-l-green-400 bg-green-50/50 dark:bg-green-900/10"
          : task.priority === TaskPriority.High
          ? "border-l-red-400"
          : task.priority === TaskPriority.Medium
          ? "border-l-yellow-400"
          : "border-l-green-400"
      } ${task.completed ? "hover:shadow-md" : "hover:shadow-xl"}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start space-x-4 flex-1">
            <div className="pt-1">
              <Switch
                checked={task.completed}
                onCheckedChange={() => onToggleComplete(task.id)}
                className="cursor-pointer data-[state=checked]:bg-green-500 transition-all duration-200"
              />
            </div>

            <div className="flex-1 space-y-3">
              {isEditing ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="flex-1 min-w-[200px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                  <Button
                    size="sm"
                    onClick={handleEdit}
                    className="cursor-pointer bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition-all duration-200"
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setEditTitle(task.title);
                    }}
                    className="cursor-pointer px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3
                    className={`font-semibold text-lg leading-tight ${
                      task.completed
                        ? "line-through text-gray-500 dark:text-gray-400"
                        : "text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p
                      className={`text-sm leading-relaxed ${
                        task.completed
                          ? "text-gray-400 dark:text-gray-500"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {task.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge
                      className={`${getPriorityStyles(
                        task.priority
                      )} font-medium px-2 py-1 text-xs`}
                    >
                      {task.priority}
                    </Badge>
                    {task.category && (
                      <Badge
                        variant="outline"
                        className="font-medium px-2 py-1 text-xs border-gray-300 dark:border-gray-600"
                      >
                        {task.category}
                      </Badge>
                    )}
                    {task.dueDate && (
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded-md">
                        <Calendar className="h-3 w-3" />
                        <span className="font-medium">
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(!isEditing)}
              className="cursor-pointer h-9 w-9 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-full transition-all duration-200 group"
            >
              <Edit3 className="h-4 w-4 text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDeleteTask(task.id)}
              className="cursor-pointer h-9 w-9 p-0 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full transition-all duration-200 group"
            >
              <Trash2 className="h-4 w-4 text-gray-500 group-hover:text-red-600 dark:group-hover:text-red-400" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
