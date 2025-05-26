import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Task } from "@/types";

const categories = ["Work", "Personal", "Shopping", "Health", "Learning"];

interface TaskFormProps {
  onAddTask: (task: Omit<Task, "id" | "createdAt">) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title,
      description,
      completed: false,
      priority,
      category: category || "Personal",
      dueDate,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setPriority("medium");
    setCategory("");
    setDueDate("");
    setIsFormVisible(false);
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add New Task
      </Button>

      {isFormVisible && (
        <div className="animate-slide-down">
          <Card className="border-purple-200 dark:border-purple-800 shadow-xl bg-white dark:bg-slate-800 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Create New Task
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFormVisible(false)}
                  className="hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="title"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Task Title
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter task title..."
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="category"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Category
                    </Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-purple-500">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem
                            key={cat}
                            value={cat}
                            className="hover:bg-purple-50 dark:hover:bg-purple-900/20"
                          >
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Task description..."
                    rows={3}
                    className="transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="priority"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Priority
                    </Label>
                    <Select
                      value={priority}
                      onValueChange={(value: "low" | "medium" | "high") =>
                        setPriority(value)
                      }
                    >
                      <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-purple-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="low"
                          className="hover:bg-green-50 dark:hover:bg-green-900/20"
                        >
                          Low
                        </SelectItem>
                        <SelectItem
                          value="medium"
                          className="hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                        >
                          Medium
                        </SelectItem>
                        <SelectItem
                          value="high"
                          className="hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          High
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="dueDate"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Due Date
                    </Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Create Task
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsFormVisible(false)}
                    className="px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
