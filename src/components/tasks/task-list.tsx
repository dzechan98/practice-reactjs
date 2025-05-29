import { TaskItem } from "@/components/tasks/task-item";
import type { Task } from "@/types";

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
        Tasks ({tasks.length})
      </h2>

      {tasks.length === 0 ? (
        <div className="text-center py-16 animate-fade-in">
          <div className="text-gray-400 dark:text-gray-500 text-lg font-medium">
            No tasks found
          </div>
          <p className="text-gray-300 dark:text-gray-600 text-sm mt-2">
            Create your first task to get started!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className="animate-slide-in-from-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TaskItem task={task} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
