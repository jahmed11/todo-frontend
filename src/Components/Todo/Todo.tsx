import { FC } from "react";
import { CheckOutlined, CloseOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { List, Switch, Button, Popconfirm } from "antd";
import { TodoProps } from "../../types/todo";
import styles from "./todo.module.css";

const Todo: FC<TodoProps> = ({ todo, onTodoStatusChange, onEditClick, onDeleteClick }) => {
  const { title, completed, id } = todo;
  return (
    <List.Item key={id}>
      <List.Item.Meta title={title} />
      <div className={styles["todo-action-container"]}>
        <div className={styles["status-container"]}>
          <span className={styles["status"]}>status:</span>
          <Switch
            onChange={(checked) => onTodoStatusChange(checked, id)}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={completed}
          />
        </div>
        <Button onClick={() => onEditClick(todo)} shape="circle" icon={<EditOutlined />} />
        <Popconfirm
          title="Delete the todo"
          description="Are you sure to delete this todo?"
          onConfirm={() => onDeleteClick(todo.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger shape="circle" icon={<DeleteOutlined />} />
        </Popconfirm>
      </div>
    </List.Item>
  );
};

export default Todo;
