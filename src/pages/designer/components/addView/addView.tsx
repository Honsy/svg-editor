import { Button, Form, Input, Modal } from "antd"
import { useForm } from "antd/es/form/Form"
import React, { useState } from "react"

export interface AddViewProps {
}

const AddViewModal: React.FC<AddViewProps> = ({}) => {
  const [form] = useForm()

  return (
      <Form
        form={form}>
        <Form.Item
          label="视图名称"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
  )
}

export default React.memo(AddViewModal)
