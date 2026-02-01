import { useState } from "react";
import { ClipboardList } from "lucide-react";
import TodoInput from "@/components/TodoInput";
import TodoItem from "@/components/TodoItem";
import TodoFilter from "@/components/TodoFilter";
import TodoEditDialog from "@/components/TodoEditDialog";
import { useTodos } from "@/hooks/useTodos";

const Index = () => {
  const { todos, filter, setFilter, addTodo, toggleTodo, updateTodo, deleteTodo, counts } =
    useTodos();
  const [editingTodo, setEditingTodo] = useState<{
    id: string;
    text: string;
    dueDate?: Date;
    priority: "high" | "medium" | "low";
  } | null>(null);

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:py-16">
      <div className="max-w-xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <ClipboardList className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">待办清单</h1>
          <p className="text-muted-foreground">记录你的每一个小目标</p>
        </div>

        {/* Input */}
        <TodoInput onAdd={addTodo} />

        {/* Filter */}
        <TodoFilter filter={filter} onFilterChange={setFilter} counts={counts} />

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">
                {filter === "all"
                  ? "还没有任务，添加一个吧！"
                  : filter === "active"
                  ? "没有进行中的任务"
                  : "还没有完成的任务"}
              </p>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
                dueDate={todo.dueDate}
                priority={todo.priority}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={(id) => {
                  const todoToEdit = todos.find((t) => t.id === id);
                  if (todoToEdit) {
                    setEditingTodo({
                      id,
                      text: todoToEdit.text,
                      dueDate: todoToEdit.dueDate,
                      priority: todoToEdit.priority,
                    });
                  }
                }}
              />
            ))
          )}
        </div>

        {/* Footer Stats */}
        {counts.all > 0 && (
          <div className="text-center text-sm text-muted-foreground">
            共 {counts.all} 个任务，已完成 {counts.completed} 个
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <TodoEditDialog
        open={!!editingTodo}
        onOpenChange={(open) => !open && setEditingTodo(null)}
        initialText={editingTodo?.text || ""}
        initialDueDate={editingTodo?.dueDate}
        initialPriority={editingTodo?.priority || "medium"}
        onSave={(text, dueDate, priority) => {
          if (editingTodo) {
            updateTodo(editingTodo.id, text, dueDate, priority);
            setEditingTodo(null);
          }
        }}
      />
    </div>
  );
};

export default Index;
