type TodoTagID = string;
type TodoID = string;
type TodoGroupID = string;

interface ITodoTag {
  id: TodoTagID;
  title: string;
  description?: string;
  color?: string;
}

interface ITodoItem {
  id?: TodoID;
  title: string;
  description?: string;
  tags: TodoTag[];
  due?: string;
  completed: bool;
  group: TodoGroup;
}

interface ITodoGroup {
  id?: TodoGroupID;
  title: string;
  description?: string;
  todos: TodoItem[];
  archived: boolean;
}
