import { Dispatch, SetStateAction } from "react";

export type ID = string;

export type UpdateKey = "title" | "completed";
export type UpdateValue = string | boolean;

export type Todo = {
  id: ID;
  title: string;
  completed: boolean;
};

export interface TodoProps {
  todo: Todo;
  onTodoStatusChange: (checked: boolean, id: ID) => void;
  onEditClick: (item: Todo) => void;
  onDeleteClick: (id: ID) => void;
}

export interface IAddTodoProps {
  openAddTodo: boolean;
  setOpenAddTodo: Dispatch<SetStateAction<boolean>>;
  todoItem: Todo | null;
  addTodo: (todo: Todo) => void;
  updateById: (id: ID, key: UpdateKey, value: UpdateValue) => void;
}

export interface IListHeaderProps {
  onAddClick: () => void;
}

export type IFormValues = {
  title: string;
};

export type UpdateTodo = {
  title?: string;
  completed?: boolean;
};
