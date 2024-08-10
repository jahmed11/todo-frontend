import { FC, useState, useEffect } from "react";
import { Modal, Form } from "antd";
import { IAddTodoProps, IFormValues } from "../../types/todo";
import { createTodo, updateTodo } from "../../api/todoServices";
import AddTodoForm from "./CreateTodoForm";

const AddTodo: FC<IAddTodoProps> = ({
  openAddTodo,
  setOpenAddTodo,
  todoItem,
  addTodo,
  updateById,
}) => {
  const isUpdate = Boolean(todoItem?.id);

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isUpdate) {
      form.setFieldsValue({ title: todoItem?.title || "" });
    }
  }, [todoItem]);

  const onFinish = async (values: IFormValues) => {
    let apiService = null;

    if (isUpdate && todoItem) {
      apiService = (formValue: IFormValues) => updateTodo(todoItem.id, formValue);
    } else {
      apiService = (formValue: IFormValues) => createTodo({ ...formValue, completed: false });
    }

    console.log(values);
    setIsLoading(true);
    try {
      const response = await apiService(values);

      if (isUpdate && todoItem) {
        updateById(todoItem.id, "title", values.title);
      } else {
        addTodo(response.data);
      }

      onCancel();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = (error: any) => {
    console.log(error);
  };

  const onCancel = () => {
    setOpenAddTodo(false);
  };

  const onOk = () => {
    form.submit();
  };
  return (
    <Modal
      title={isUpdate ? "Update Todo" : "Add Todo"}
      okText={isUpdate ? "Update" : "Create"}
      confirmLoading={isLoading}
      open={openAddTodo}
      onOk={onOk}
      onCancel={onCancel}
    >
      <AddTodoForm form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} />
    </Modal>
  );
};

export default AddTodo;
