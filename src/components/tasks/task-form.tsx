import { useState } from "react";
import { Plus, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  defaultValues,
  taskSchema,
  type TaskFormData,
} from "@/components/tasks/schema";
import { TaskPriority } from "@/types";
import { useDispatch } from "react-redux";
import { addTask } from "@/store/task-slice";

const categories = ["Work", "Personal", "Shopping", "Health", "Learning"];

const priorityColors = {
  Low: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  Medium:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  High: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
};

export const TaskForm: React.FC = () => {
  const dispatch = useDispatch();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues,
  });

  const {
    reset,
    formState: { errors, isDirty },
    watch,
  } = form;

  const watchedPriority = watch("priority");
  const watchedTitle = watch("title");

  const onSubmit = async (data: TaskFormData) => {
    try {
      setIsSubmitting(true);

      dispatch(
        addTask({
          ...data,
          category: data.category || "Personal",
        })
      );

      toast.success("Task created successfully!", {
        duration: 3000,
        description: `Task "${data.title}" has been added.`,
      });

      reset();
      setIsFormVisible(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create task. Please try again.", {
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      const confirmDiscard = window.confirm(
        "You have unsaved changes. Are you sure you want to discard them?"
      );
      if (!confirmDiscard) return;
    }
    setIsFormVisible(false);
    reset();
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        disabled={isSubmitting}
      >
        <Plus className="h-5 w-5 mr-2" />
        {isFormVisible ? "Hide Form" : "Add New Task"}
      </Button>

      {isFormVisible && (
        <div className="animate-in slide-in-from-top-2 duration-300">
          <Card className="border-purple-200 dark:border-purple-800 shadow-xl bg-white dark:bg-slate-800 overflow-hidden">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Create New Task
                  </CardTitle>
                  {watchedTitle && (
                    <Badge variant="outline" className="text-xs">
                      {watchedTitle.length}/100
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  className="cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full focus:ring-2 focus:ring-red-500"
                  disabled={isSubmitting}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                  noValidate
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            Task Title
                            {!errors.title &&
                              field.value &&
                              field.value.length >= 3 && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter task title..."
                              {...field}
                              className={`transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                errors.title
                                  ? "border-red-500 focus:ring-red-500"
                                  : field.value && field.value.length >= 3
                                  ? "border-green-500 focus:ring-green-500"
                                  : ""
                              }`}
                              disabled={isSubmitting}
                              aria-describedby={
                                errors.title ? "title-error" : undefined
                              }
                            />
                          </FormControl>
                          <FormMessage
                            id="title-error"
                            className="text-xs text-red-500 mt-1 flex items-center gap-1"
                          >
                            {errors.title && (
                              <AlertCircle className="h-3 w-3" />
                            )}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          Description
                          {field.value && (
                            <Badge variant="outline" className="text-xs">
                              {field.value.length}/500
                            </Badge>
                          )}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Task description (optional)..."
                            rows={3}
                            className={`transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
                              errors.description
                                ? "border-red-500 focus:ring-red-500"
                                : ""
                            }`}
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          {errors.description && (
                            <AlertCircle className="h-3 w-3" />
                          )}
                        </FormMessage>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            Priority
                            {watchedPriority && (
                              <Badge
                                className={priorityColors[watchedPriority]}
                              >
                                {watchedPriority}
                              </Badge>
                            )}
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={isSubmitting}
                          >
                            <FormControl>
                              <SelectTrigger
                                className={`w-full transition-all duration-200 focus:ring-2 focus:ring-purple-500 ${
                                  errors.priority ? "border-red-500" : ""
                                }`}
                              >
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem
                                value={TaskPriority.Low}
                                className="hover:bg-green-50 dark:hover:bg-green-900/20 focus:bg-green-50 dark:focus:bg-green-900/20"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                  Low Priority
                                </div>
                              </SelectItem>
                              <SelectItem
                                value={TaskPriority.Medium}
                                className="hover:bg-yellow-50 dark:hover:bg-yellow-900/20 focus:bg-yellow-50 dark:focus:bg-yellow-900/20"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                  Medium Priority
                                </div>
                              </SelectItem>
                              <SelectItem
                                value={TaskPriority.High}
                                className="hover:bg-red-50 dark:hover:bg-red-900/20 focus:bg-red-50 dark:focus:bg-red-900/20"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                  High Priority
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs text-red-500 mt-1 flex items-center gap-1">
                            {errors.priority && (
                              <AlertCircle className="h-3 w-3" />
                            )}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            Category
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={isSubmitting}
                          >
                            <FormControl>
                              <SelectTrigger
                                className={`w-full transition-all duration-200 focus:ring-2 focus:ring-purple-500 ${
                                  errors.category ? "border-red-500" : ""
                                }`}
                              >
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem
                                  key={cat}
                                  value={cat}
                                  className="hover:bg-purple-50 dark:hover:bg-purple-900/20 focus:bg-purple-50 dark:focus:bg-purple-900/20"
                                >
                                  {cat}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs text-red-500 mt-1 flex items-center gap-1">
                            {errors.category && (
                              <AlertCircle className="h-3 w-3" />
                            )}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Due Date
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            min={getTodayDate()}
                            className={`transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                              errors.dueDate
                                ? "border-red-500 focus:ring-red-500"
                                : ""
                            }`}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          {errors.dueDate && (
                            <AlertCircle className="h-3 w-3" />
                          )}
                        </FormMessage>
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:transform-none disabled:hover:shadow-md focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Creating Task...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Create Task
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isSubmitting}
                      className="px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
