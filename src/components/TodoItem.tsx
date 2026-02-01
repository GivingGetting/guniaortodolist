import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ id, text, completed, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div
      className={cn(
        "group flex items-center gap-4 p-4 rounded-lg bg-card",
        "shadow-soft hover:shadow-medium transition-all duration-200",
        "todo-item-enter",
        completed && "opacity-60"
      )}
    >
      <button
        onClick={() => onToggle(id)}
        className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center",
          "transition-all duration-200",
          completed
            ? "bg-primary border-primary checkbox-bounce"
            : "border-muted-foreground/30 hover:border-primary"
        )}
        aria-label={completed ? "标记为未完成" : "标记为完成"}
      >
        {completed && <Check className="w-4 h-4 text-primary-foreground" />}
      </button>

      <span
        className={cn(
          "flex-1 text-foreground transition-all duration-200",
          completed && "line-through text-muted-foreground"
        )}
      >
        {text}
      </span>

      <button
        onClick={() => onDelete(id)}
        className={cn(
          "opacity-0 group-hover:opacity-100 p-2 rounded-lg",
          "text-muted-foreground hover:text-destructive hover:bg-destructive/10",
          "transition-all duration-200"
        )}
        aria-label="删除任务"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TodoItem;
