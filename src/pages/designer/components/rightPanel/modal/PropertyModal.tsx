import { useCallback, useState } from "react"
import NiceModal, { useModal, antdModal } from '@ebay/nice-modal-react';
import { Modal } from "antd";
import GaugeProperty from "../components/GaugeProperty";

interface PropertyModalProps {
  user?: any
}

export default NiceModal.create(({ user }: PropertyModalProps) => {
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
      title="扩展属性"
      okText="确定"
      cancelText="取消"
      onOk={handleSubmit}
    >
      <GaugeProperty></GaugeProperty>
    </Modal>
  );
})