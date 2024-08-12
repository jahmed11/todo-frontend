import { FC } from "react";

import { Form, Input } from "antd";

const AddTodoForm: FC<any> = ({ form, onFinishFailed, onFinish }) => {
  return (
    <Form form={form} name="add-todo" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item
        rules={[{ required: true, message: "Todo title is required" }]}
        name="title"
        label="Title"
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default AddTodoForm;
