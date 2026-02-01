import { useState } from "react";
import { Plus, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TodoInputProps {
  onAdd: (text: string, dueDate?: Date) => void;
}

const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), dueDate);
      setText("");
      setDueDate(undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="添加新任务..."
          className={cn(
            "w-full px-5 py-4 pr-14 rounded-xl",
            "bg-card shadow-soft",
            "border border-border focus:border-primary",
            "text-foreground placeholder:text-muted-foreground",
            "outline-none transition-all duration-200",
            "focus:shadow-medium focus:ring-2 focus:ring-primary/20"
          )}
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2",
            "w-9 h-9 rounded-lg",
            "flex items-center justify-center",
            "bg-primary text-primary-foreground",
            "transition-all duration-200",
            "hover:scale-105 hover:shadow-glow",
            "disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
          )}
          aria-label="添加任务"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                !dueDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dueDate ? format(dueDate, "PPP", { locale: zhCN }) : "设置截止日期"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dueDate}
              onSelect={(date) => {
                setDueDate(date);
                setIsCalendarOpen(false);
              }}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {dueDate && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setDueDate(undefined)}
            className="text-muted-foreground hover:text-destructive"
          >
            清除日期
          </Button>
        )}
      </div>
    </form>
  );
};

export default TodoInput;
