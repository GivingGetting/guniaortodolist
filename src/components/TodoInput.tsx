import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
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
    </form>
  );
};

export default TodoInput;
