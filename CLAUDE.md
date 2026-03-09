# CLAUDE.md

Claude Code 在此项目中的工作指南。

## 常用命令

```sh
bun run dev        # 启动开发服务器
bun run build      # 构建生产版本
bun run test       # 运行测试（vitest run）
bun run test:watch # 监听模式测试
bun run lint       # ESLint 检查
bun run preview    # 预览构建产物
```

> 此项目使用 **bun** 作为包管理器（存在 bun.lockb）。

## 技术约定

- **语言**：TypeScript，严格模式，不使用 `any`
- **组件**：函数组件 + hooks，文件名 PascalCase
- **样式**：Tailwind CSS 工具类 + `cn()` 合并（来自 `@/lib/utils`）
- **UI 组件**：优先使用 `src/components/ui/`（shadcn/ui），不引入新 UI 库
- **路径别名**：`@/` 映射到 `src/`
- **状态**：React hooks 管理，持久化用 `localStorage`
- **图标**：lucide-react，不引入其他图标库

## 项目关键文件

| 文件 | 职责 |
|------|------|
| `src/hooks/useTodos.ts` | 核心状态管理：CRUD、过滤、localStorage |
| `src/pages/Index.tsx` | 主页面，组装所有组件 |
| `src/components/TodoInput.tsx` | 新任务输入（含日期/优先级） |
| `src/components/TodoItem.tsx` | 单条任务渲染逻辑 |
| `src/components/SortableTodoItem.tsx` | dnd-kit 拖拽包装层 |
| `src/components/TodoEditDialog.tsx` | 编辑弹窗 |
| `src/components/TodoFilter.tsx` | 全部/进行中/已完成 过滤栏 |

## 数据结构

```ts
// src/hooks/useTodos.ts
interface Todo {
  id: string;           // crypto.randomUUID()
  text: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  priority: "high" | "medium" | "low";
}

// localStorage key: "lovable-todos"
```

## 优先级颜色规范

| 优先级 | 左边框 | 图标/文字 |
|--------|--------|-----------|
| high   | border-l-red-500 | text-red-500 |
| medium | border-l-amber-500 | text-amber-500 |
| low    | border-l-blue-500 | text-blue-500 |

## 注意事项

- UI 文字为**中文**，新增文案保持中文
- 日期格式使用 `date-fns` + `zhCN` locale
- 拖拽通过 `@dnd-kit/core` 实现，排序逻辑在 `Index.tsx` 的 `handleDragEnd`
- 新增 shadcn/ui 组件用 `bunx shadcn@latest add <component>`
