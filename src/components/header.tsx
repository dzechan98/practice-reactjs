import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface HeaderProps {
  userName: string;
  taskCount: number;
  completedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  userName,
  taskCount,
  completedCount,
}) => {
  const completionRate = taskCount > 0 ? (completedCount / taskCount) * 100 : 0;

  return (
    <div className="mb-8 animate-slide-in-from-top">
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <CardTitle className="text-2xl md:text-3xl font-bold">
                Welcome back, {userName}! 👋
              </CardTitle>
              <CardDescription className="text-blue-100 text-base">
                You have {taskCount} tasks, {completedCount} completed
              </CardDescription>
            </div>
            <div className="text-center md:text-right">
              <div className="text-3xl md:text-4xl font-bold">
                {Math.round(completionRate)}%
              </div>
              <div className="text-sm text-blue-100">Completion Rate</div>
            </div>
          </div>
          <div className="mt-6">
            <Progress
              value={completionRate}
              className="h-3 bg-blue-400/30 rounded-full overflow-hidden"
            />
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
