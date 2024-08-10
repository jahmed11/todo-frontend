import { List } from "antd";
import { useState, useEffect, useRef } from "react";
import Todo from "../Todo";
import ListHeader from "./ListHeader/ListHeader";
import AddTodo from "../CreateTodo";
import { getTodos, updateTodo, deleteTodo } from "../../api/todoServices";
import { Todo as ITodo, Todo as TodoType, ID, UpdateKey, UpdateValue } from "../../types/todo";
import styles from "./todoList.module.css";

const TodosList = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [openAddTodo, setOpenAddTodo] = useState<boolean>(false);
  const selectedTodoRef = useRef<ITodo | null>(null);

  const addTodo = (todo: ITodo) => {
    setTodos((prev) => [todo, ...prev]);
  };

  const filterTodoById = (id: ID) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const updateById = (id: ID, key: UpdateKey, value: UpdateValue) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            [key]: value,
          };
        }

        return todo;
      })
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getTodos();
        console.log(response);
        setTodos(response.data);
      } catch (err) {
        console.log("err", err);
      }
    })();
  }, []);

  const onTodoStatusChange = async (checked: boolean, id: string) => {
    try {
      console.log(checked);

      await updateTodo(id, { completed: checked });
      updateById(id, "completed", checked);
    } catch (err) {
      console.log(err);
    }
  };

  const onAddClick = (todo?: ITodo) => {
    if (todo) {
      selectedTodoRef.current = todo;
    }
    setOpenAddTodo(true);
  };

  const onDeleteClick = async (id: ID) => {
    try {
      await deleteTodo(id);
      filterTodoById(id);
    } catch (err) {
      console.log("err");
    } finally {
    }
  };

  const addTodoProps = {
    openAddTodo,
    setOpenAddTodo,
    todoItem: selectedTodoRef.current,
    addTodo,
    updateById,
  };

  const todoProps = {
    onDeleteClick,
    onEditClick: onAddClick,
    onTodoStatusChange,
  };

  return (
    <div className={styles["todoList-container"]}>
      {openAddTodo && <AddTodo {...addTodoProps} />}
      <List
        header={<ListHeader onAddClick={onAddClick} />}
        dataSource={todos}
        renderItem={(todo) => <Todo todo={todo} {...todoProps} />}
      />
    </div>
  );
};

export default TodosList;
