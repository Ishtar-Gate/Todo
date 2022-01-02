import { isAfter } from "date-fns";
import { nanoid } from "nanoid";
import Color from "color";
import { DEFAULT_TODO_GROUP, TODO_TAG_COLOR } from "./constants";

/**
 * Todo tag definition
 */
export class TodoTag {
  id: TodoTagID;
  title: string;
  description?: string;
  color: string;

  constructor({ id, title, description, color }: ITodoTag) {
    this.id = id || "todo-tag-" + nanoid();
    this.title = title;
    this.description = description;
    try {
      this.color = Color(color).hex();
    } catch {
      this.color = TODO_TAG_COLOR;
    }
  }

  toString = (): string => `Todo Tag: ${this.title} (${this.id})`;
  toJSON = () => ({
    id: this.id,
    title: this.title,
    description: this.description,
    color: this.color,
  });

  // TODO apis
  // static get = (id: TodoTagID): TodoTag => {
  static get = (id: TodoTagID) => {
    console.log(`Fetching todo tag from id (${id})`);
    // return new TodoTag();
  };
  static all = (): TodoTag[] => {
    console.log(`Fetching all todo tags`);
    return [];
  };
  save = () => {
    console.log(`Saving ${this}`);
  };
  delete = () => {
    console.log(`Deleting ${this}`);
  };

  /**
   * Count how many todos have this tag
   */
  count = (): Promise<number> => {
    return new Promise((resolve) => resolve(0));
  };
}

export class TodoItem {
  id: TodoID;
  title: string;
  description?: string;
  tags: TodoTag[];
  due?: Date;
  private completed: boolean = false;
  group: TodoGroup;

  constructor({
    id,
    title,
    description,
    tags,
    due,
    completed,
    group,
  }: ITodoItem) {
    this.id = id || "todo-item-" + nanoid();
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.tags = tags;
    if (due) {
      this.due = new Date(due);
    }
    this.group = group;
  }

  toggleComplete = () => {
    this.completed = !this.completed;
  };

  get outdated(): boolean {
    return !!this.due && isAfter(this.due, new Date());
  }

  hasTag = (tag: TodoTag): boolean =>
    this.tags.filter((t) => t.id === tag.id).length !== 0;
  addTag = (tag: TodoTag) => {
    if (this.hasTag(tag)) {
      return;
    }
    this.tags.push(tag);
  };
  removeTag = (tag: TodoTag) => {
    this.tags = this.tags.filter((t) => t.id !== tag.id);
  };

  toString = (): string => `Todo item: ${this.title} (${this.id})`;
  toJSON = () => ({
    id: this.id,
    title: this.title,
    description: this.description,
    tags: this.tags.map((tag) => tag.id),
    due: this.due?.toJSON(),
    completed: this.completed,
    group: this.group.id,
  });

  // TODO apis
  // static get = (id: TodoID): TodoItem => {
  static get = (id: TodoID) => {
    console.log(`Fetching todo item from id (${id})`);
    // return new TodoItem();
  };
  static all = (id?: TodoGroupID): TodoItem[] => {
    if (id) {
      console.log(`Fetching all todo items from group ${id}`);
      return [];
    }
    console.log(`Fetching all todo items`);
    return [];
  };
  save = () => {
    console.log(`Saving ${this}`);
  };
  delete = () => {
    console.log(`Deleting ${this}`);
  };
}

export class TodoGroup {
  id: TodoGroupID;
  title: string;
  description?: string;
  todos: TodoItem[];
  archived: boolean = false;

  constructor({ id, title, description, todos, archived }: ITodoGroup) {
    this.id = id || "todo-group-" + nanoid();
    this.title = title;
    this.description = description;
    this.todos = todos;
    this.archived = archived;
  }

  hasTodo = (todoItem: TodoItem): boolean =>
    this.todos.filter((t) => t.id === todoItem.id).length !== 0;
  addTodo = (todoItem: TodoItem) => {
    if (this.hasTodo(todoItem)) {
      return;
    }
    this.todos.push(todoItem);
  };
  removeTodo = (todoItem: TodoItem) => {
    this.todos = this.todos.filter((t) => t.id !== todoItem.id);
  };

  toString = (): string => `Todo group: ${this.title} (${this.id})`;
  toJSON = () => ({
    id: this.id,
    title: this.title,
    description: this.description,
    todos: this.todos.map((todoItem) => todoItem.id),
  });

  // TODO apis
  // static get = (id: TodoGroupID): TodoGroup => {
  static get = (id: TodoGroupID) => {
    console.log(`Fetching todo group from id (${id})`);
    // return new TodoGroup();
  };
  static all = async (): Promise<TodoGroup[]> => {
    console.log(`Fetching all todo groups`);
    let result: TodoGroup[] = [];
    if (result.length === 0) {
      const group = new TodoGroup(DEFAULT_TODO_GROUP);
      await group.save();
      result.push(group);
    }
    return result;
  };
  save = (): Promise<any> => {
    console.log(`Saving ${this}`);
    return new Promise((resolve) => resolve(true));
  };
  archive = () => {
    this.archived = true;
    console.log(`Archiving ${this}`);
  };
  unarchive = () => {
    this.archived = false;
    console.log(`Unarchiving ${this}`);
  };
  delete = () => {
    console.log(`Deleting ${this}`);
  };
}
