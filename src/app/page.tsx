import TodoList from "@/components/todo/todo-list";

export default function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-800">
      <TodoList />
    </div>
  );
}
