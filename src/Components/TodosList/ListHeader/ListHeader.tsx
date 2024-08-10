import { FC } from "react";
import { Button } from "antd";
import { IListHeaderProps } from "../../../types/todo";
import styles from "./listHeader.module.css";

const ListHeader: FC<IListHeaderProps> = ({ onAddClick }) => {
  return (
    <div className={styles["header-container"]}>
      <h3>Todo List</h3>
      <Button shape="round" onClick={onAddClick}>
        Add
      </Button>
    </div>
  );
};

export default ListHeader;
