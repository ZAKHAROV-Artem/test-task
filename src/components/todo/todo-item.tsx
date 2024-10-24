import { Todo } from "@/types/todo";

type TodoItemProps = {
  todo: Todo;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, data: Partial<Todo>) => void;
};
export default function TodoItem({
  todo,
  deleteTodo,
  updateTodo,
}: TodoItemProps) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg p-3 shadow-lg">
      <input
        type="checkbox"
        className="cursor-pointer"
        defaultChecked={todo.completed}
        onChange={(e) =>
          updateTodo(todo.id, {
            completed: e.target.checked,
          })
        }
      />
      <p className="cursor-pointer">{todo.title}</p>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
}
