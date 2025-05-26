import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ThemeToggleProps {
  darkMode: boolean;
  onToggle: (darkMode: boolean) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  darkMode,
  onToggle,
}) => {
  return (
    <div className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
      <Sun
        className={`h-4 w-4 transition-all duration-300 ${
          darkMode ? "text-gray-400" : "text-yellow-500"
        }`}
      />
      <Switch
        id="dark-mode"
        checked={darkMode}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-slate-600 data-[state=unchecked]:bg-yellow-400"
      />
      <Moon
        className={`h-4 w-4 transition-all duration-300 ${
          darkMode ? "text-blue-400" : "text-gray-400"
        }`}
      />
      <Label
        htmlFor="dark-mode"
        className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
      >
        {darkMode ? "Dark" : "Light"}
      </Label>
    </div>
  );
};
