import { FC } from "react";
import { Button } from "antd";
import { IListHeaderProps } from "../../../types/todo";
import styles from "./listHeader.module.css";

const ListHeader: FC<IListHeaderProps> = ({ onAddClick }) => {
  return (
    <div className={styles["header-container"]}>
      <h2 className={styles["header"]}>Todo List</h2>
      <Button shape="round" onClick={onAddClick}>
        Add
      </Button>
    </div>
  );
};

export default ListHeader;