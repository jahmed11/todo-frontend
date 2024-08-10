import { Todo, UpdateTodo, ID } from "../types/todo";
import axiosInstance from "./api";

export const getTodos = () => {
  return axiosInstance({
    method: "GET",
    url: "/todos",
  }).then((response) => response.data);
};

export const createTodo = (data: Omit<Todo, "id">) => {
  return axiosInstance({
    method: "POST",
    url: "/todos",
    data: {
      data,
    },
  }).then((response) => response.data);
};

export const updateTodo = (id: ID, data: UpdateTodo) => {
  return axiosInstance({
    method: "PUT",
    url: `/todos/${id}`,
    data,
  }).then((response) => response.data);
};

export const deleteTodo = (id: ID) => {
  return axiosInstance({
    method: "DELETE",
    url: `/todos/${id}`,
  }).then((response) => response.data);
};
