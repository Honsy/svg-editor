import { Button, Form, Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { designer } from '../../VizDesigner'

export interface AddViewModel {
  name: string
}

export type AddViewProps = {
  onCancel: () => void
  modalVisible: boolean
  values: Partial<AddViewModel>
}

const AddViewModal: React.FC<AddViewProps> = (props) => {
  const [form] = Form.useForm()
  useEffect(() => {
    form.resetFields()
    form.setFieldsValue(props.values)
  })
  const onSubmit = () => {
    const values = form.getFieldsValue();
    designer.addView(values.name);
    props.onCancel()
  }
  return (
    <Modal open={props.modalVisible} onOk={onSubmit} onCancel={props.onCancel} forceRender={true} title={`${props.values.name ? '编辑' : '添加'}`}>
      <Form form={form}>
        <Form.Item label="视图名称" name="name" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default React.memo(AddViewModal)
