import { useState, useEffect } from "react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { CalendarIcon, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Priority } from "@/hooks/useTodos";

interface TodoEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialText: string;
  initialDueDate?: Date;
  initialPriority: Priority;
  onSave: (text: string, dueDate?: Date, priority?: Priority) => void;
}

const priorityConfig = {
  high: { label: "高", color: "text-red-500" },
  medium: { label: "中", color: "text-amber-500" },
  low: { label: "低", color: "text-blue-500" },
};

const TodoEditDialog = ({
  open,
  onOpenChange,
  initialText,
  initialDueDate,
  initialPriority,
  onSave,
}: TodoEditDialogProps) => {
  const [text, setText] = useState(initialText);
  const [dueDate, setDueDate] = useState<Date | undefined>(initialDueDate);
  const [priority, setPriority] = useState<Priority>(initialPriority);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setText(initialText);
      setDueDate(initialDueDate);
      setPriority(initialPriority);
    }
  }, [open, initialText, initialDueDate, initialPriority]);

  const handleSave = () => {
    if (text.trim()) {
      onSave(text.trim(), dueDate, priority);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>编辑任务</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="task-text">任务内容</Label>
            <Input
              id="task-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="输入任务内容..."
            />
          </div>
          <div className="space-y-2">
            <Label>截止日期</Label>
            <div className="flex items-center gap-2">
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "flex-1 justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate
                      ? format(dueDate, "PPP", { locale: zhCN })
                      : "设置截止日期"}
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
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
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
                  清除
                </Button>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>优先级</Label>
            <Popover open={isPriorityOpen} onOpenChange={setIsPriorityOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <Flag className={cn("mr-2 h-4 w-4", priorityConfig[priority].color)} />
                  {priorityConfig[priority].label}优先级
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2" align="start">
                <div className="flex flex-col gap-1">
                  {(Object.keys(priorityConfig) as Priority[]).map((p) => (
                    <Button
                      key={p}
                      type="button"
                      variant={priority === p ? "secondary" : "ghost"}
                      size="sm"
                      className="justify-start"
                      onClick={() => {
                        setPriority(p);
                        setIsPriorityOpen(false);
                      }}
                    >
                      <Flag className={cn("mr-2 h-4 w-4", priorityConfig[p].color)} />
                      {priorityConfig[p].label}优先级
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSave} disabled={!text.trim()}>
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TodoEditDialog;
