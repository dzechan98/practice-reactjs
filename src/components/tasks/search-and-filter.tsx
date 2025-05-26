import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Filter = "all" | "active" | "completed";

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
}) => {
  return (
    <div className="space-y-4 md:space-y-0 md:flex md:items-center md:gap-6 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700"
        />
      </div>

      <Tabs
        value={filter}
        onValueChange={(value) => onFilterChange(value as Filter)}
        className="w-full md:w-auto"
      >
        <TabsList className="grid w-full grid-cols-3 md:w-auto bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:shadow-sm transition-all duration-200 font-medium"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="active"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:shadow-sm transition-all duration-200 font-medium"
          >
            Active
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:shadow-sm transition-all duration-200 font-medium"
          >
            Completed
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
