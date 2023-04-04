import { useCallback, useState } from "react"
import NiceModal, { useModal, antdModal } from '@ebay/nice-modal-react';
import { Modal } from "antd";
import IotSelectPoint from "./IotSelectPoint";

interface IotSelectPointProps {
  user?: any
}

export default NiceModal.create(({ user }: IotSelectPointProps) => {
  const modal = useModal();

  const meta = {
    initialValues: user,
    fields: [
      { key: 'name', label: 'Name', required: true },
      { key: 'job', label: 'Job Title', required: true },
    ],
  };
  const handleSubmit = useCallback(() => {

  }, [])
  return (
    <Modal
      {...antdModal(modal)}
      title="点位选取"
      okText="确定"
      width={800}
      cancelText="取消"
      onOk={handleSubmit}
    >
      <IotSelectPoint></IotSelectPoint>
    </Modal>
  );
})