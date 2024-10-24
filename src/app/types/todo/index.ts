export type TodoStatus = "all" | "completed" | "uncompleted";
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
