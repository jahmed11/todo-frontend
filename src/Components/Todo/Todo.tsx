import { FC } from "react";
import { CheckOutlined, CloseOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { List, Switch, Button } from "antd";
import { TodoProps } from "../../types/todo";
import styles from "./todo.module.css";

const Todo: FC<TodoProps> = ({ todo, onTodoStatusChange, onEditClick, onDeleteClick }) => {
  const { title, completed, id } = todo;
  return (
    <List.Item key={id}>
      <List.Item.Meta title={title} />
      <div className={styles["todo-action-container"]}>
        <div>
          status:
          <Switch
            onChange={(checked) => onTodoStatusChange(checked, id)}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={completed}
          />
        </div>
        <Button onClick={() => onEditClick(todo)} shape="circle" icon={<EditOutlined />} />
        <Button
          danger
          onClick={() => onDeleteClick(todo.id)}
          shape="circle"
          icon={<DeleteOutlined />}
        />
      </div>
    </List.Item>
  );
};

export default Todo;
