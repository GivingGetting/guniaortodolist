import { Check, Trash2, Clock, AlertTriangle } from "lucide-react";
import { format, isToday, isTomorrow, isPast, differenceInDays } from "date-fns";
import { zhCN } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: Date;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const getDueDateInfo = (dueDate: Date, completed: boolean) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  if (completed) {
    return {
      text: format(dueDate, "M月d日", { locale: zhCN }),
      className: "text-muted-foreground",
      icon: Clock,
    };
  }

  if (isPast(dueDate) && !isToday(dueDate)) {
    const daysOverdue = differenceInDays(now, dueDate);
    return {
      text: `已逾期 ${daysOverdue} 天`,
      className: "text-destructive",
      icon: AlertTriangle,
    };
  }

  if (isToday(dueDate)) {
    return {
      text: "今天到期",
      className: "text-amber-600 dark:text-amber-500",
      icon: AlertTriangle,
    };
  }

  if (isTomorrow(dueDate)) {
    return {
      text: "明天到期",
      className: "text-amber-600 dark:text-amber-500",
      icon: Clock,
    };
  }

  const daysUntil = differenceInDays(dueDate, now);
  if (daysUntil <= 7) {
    return {
      text: `${daysUntil} 天后到期`,
      className: "text-primary",
      icon: Clock,
    };
  }

  return {
    text: format(dueDate, "M月d日", { locale: zhCN }),
    className: "text-muted-foreground",
    icon: Clock,
  };
};

const TodoItem = ({ id, text, completed, dueDate, onToggle, onDelete }: TodoItemProps) => {
  const dueDateInfo = dueDate ? getDueDateInfo(dueDate, completed) : null;
  const DueDateIcon = dueDateInfo?.icon;

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
          "transition-all duration-200 shrink-0",
          completed
            ? "bg-primary border-primary checkbox-bounce"
            : "border-muted-foreground/30 hover:border-primary"
        )}
        aria-label={completed ? "标记为未完成" : "标记为完成"}
      >
        {completed && <Check className="w-4 h-4 text-primary-foreground" />}
      </button>

      <div className="flex-1 min-w-0">
        <span
          className={cn(
            "block text-foreground transition-all duration-200",
            completed && "line-through text-muted-foreground"
          )}
        >
          {text}
        </span>
        {dueDateInfo && DueDateIcon && (
          <div className={cn("flex items-center gap-1 mt-1 text-sm", dueDateInfo.className)}>
            <DueDateIcon className="w-3.5 h-3.5" />
            <span>{dueDateInfo.text}</span>
          </div>
        )}
      </div>

      <button
        onClick={() => onDelete(id)}
        className={cn(
          "opacity-0 group-hover:opacity-100 p-2 rounded-lg shrink-0",
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
