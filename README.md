# 待办清单 (Todo List)

一个功能完整的中文待办事项应用，支持优先级、截止日期、拖拽排序等特性。

## 功能特性

- **添加任务** — 输入任务内容，支持设置截止日期和优先级
- **优先级管理** — 三档优先级（高 / 中 / 低），以颜色区分（红 / 橙 / 蓝）
- **截止日期** — 日历选择器，自动显示逾期、今天、明天、7天内等状态提示
- **拖拽排序** — 基于 @dnd-kit，支持鼠标和键盘拖拽调整任务顺序
- **筛选视图** — 全部 / 进行中 / 已完成 三种过滤模式，实时显示各分组数量
- **编辑任务** — 弹窗编辑任务文本、截止日期、优先级
- **删除任务** — 悬停显示删除按钮，一键移除
- **本地持久化** — 数据自动保存至 `localStorage`，刷新不丢失
- **任务统计** — 底部显示总任务数和已完成数

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | React 18 + TypeScript |
| 构建 | Vite |
| 样式 | Tailwind CSS |
| UI 组件 | shadcn/ui + Radix UI |
| 拖拽 | @dnd-kit/core + @dnd-kit/sortable |
| 日期处理 | date-fns（中文 locale） |
| 路由 | react-router-dom v6 |
| 状态管理 | React hooks（useState / useCallback / useMemo） |
| 测试 | Vitest + @testing-library/react |

## 项目结构

```
src/
├── components/
│   ├── ui/                  # shadcn/ui 基础组件
│   ├── TodoInput.tsx        # 任务输入框（含日期选择器、优先级选择）
│   ├── TodoItem.tsx         # 单个任务条目（完成/编辑/删除）
│   ├── SortableTodoItem.tsx # 拖拽排序包装组件
│   ├── TodoFilter.tsx       # 过滤标签栏
│   ├── TodoEditDialog.tsx   # 编辑弹窗
│   └── NavLink.tsx          # 导航链接
├── hooks/
│   └── useTodos.ts          # 核心状态管理 Hook（CRUD + localStorage）
├── pages/
│   ├── Index.tsx            # 主页面
│   └── NotFound.tsx         # 404 页面
├── lib/
│   └── utils.ts             # 工具函数（cn 类名合并）
└── App.tsx                  # 路由根组件
```

## 数据模型

```ts
interface Todo {
  id: string;           // crypto.randomUUID()
  text: string;         // 任务内容
  completed: boolean;   // 完成状态
  createdAt: Date;      // 创建时间
  dueDate?: Date;       // 截止日期（可选）
  priority: "high" | "medium" | "low"; // 优先级
}
```

## 快速开始

```sh
# 安装依赖
npm install
# 或
bun install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 运行测试
npm run test
```

## 截止日期状态规则

| 状态 | 显示文本 | 颜色 |
|------|----------|------|
| 已完成 | M月d日 | 灰色 |
| 已逾期 | 已逾期 N 天 | 红色（destructive） |
| 今天 | 今天到期 | 琥珀色 |
| 明天 | 明天到期 | 琥珀色 |
| 7天内 | N 天后到期 | 主题色 |
| 7天以上 | M月d日 | 灰色 |
