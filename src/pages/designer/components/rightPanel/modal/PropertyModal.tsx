import React, { useCallback, useState } from "react"
import NiceModal, { useModal, antdModal } from '@ebay/nice-modal-react';
import { Modal } from "antd";
import GaugeProperty from "../components/GaugeProperty";

interface PropertyModalProps {
  data?: any
}

export default NiceModal.create(({ data }: PropertyModalProps) => {
  const modal = useModal();

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
      <GaugeProperty data={data}></GaugeProperty>
    </Modal>
  );
})