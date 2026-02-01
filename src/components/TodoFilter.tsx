import { cn } from "@/lib/utils";

export type FilterType = "all" | "active" | "completed";

interface TodoFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

const TodoFilter = ({ filter, onFilterChange, counts }: TodoFilterProps) => {
  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "全部" },
    { key: "active", label: "进行中" },
    { key: "completed", label: "已完成" },
  ];

  return (
    <div className="flex items-center gap-2 p-1.5 rounded-xl bg-muted">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={cn(
            "flex-1 px-4 py-2 rounded-lg text-sm font-medium",
            "transition-all duration-200",
            filter === key
              ? "bg-card text-foreground shadow-soft"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {label}
          <span
            className={cn(
              "ml-1.5 text-xs",
              filter === key ? "text-primary" : "text-muted-foreground"
            )}
          >
            ({counts[key]})
          </span>
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;
