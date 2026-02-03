import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import TodoItem from "./TodoItem";
import type { Priority } from "@/hooks/useTodos";
import { cn } from "@/lib/utils";

interface SortableTodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: Date;
  priority: Priority;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const SortableTodoItem = (props: SortableTodoItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-2",
        isDragging && "opacity-50 z-50"
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="p-1 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors touch-none"
        aria-label="拖拽排序"
      >
        <GripVertical className="w-5 h-5" />
      </button>
      <div className="flex-1">
        <TodoItem {...props} />
      </div>
    </div>
  );
};

export default SortableTodoItem;
