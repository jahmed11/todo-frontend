import { FC, useState, useEffect } from "react";
import { Modal, Form, message } from "antd";
import { IAddTodoProps, IFormValues } from "../../types/todo";
import { createTodo, updateTodo } from "../../api/todoServices";
import AddTodoForm from "./CreateTodoForm/CreateTodoForm";
import { todoActions } from "../../utils/message";

/**
 * AddTodo component: Handles both adding a new todo item and updating an existing one.
 * This component is rendered as a modal with a form for input.
 */

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

  /**
   * onFinish: Handles the form submission logic.
   * - If updating, calls the updateTodo API and updates the todo in the list.
   * - If creating, calls the createTodo API and adds the new todo to the list.
   */

  const onFinish = async (values: IFormValues) => {
    let apiService = null;

    if (isUpdate && todoItem) {
      apiService = (formValue: IFormValues) => updateTodo(todoItem.id, formValue);
    } else {
      apiService = (formValue: IFormValues) => createTodo({ ...formValue, completed: false });
    }

    setIsLoading(true);
    try {
      const response = await apiService(values);
      let messageStr = null;

      if (isUpdate && todoItem) {
        updateById(todoItem.id, "title", values.title);
        messageStr = todoActions.updateTitle;
      } else {
        addTodo(response.data);
        messageStr = todoActions.createTodo;
      }
      message.success(messageStr);
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
