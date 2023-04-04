import { GaugeProperty } from '@/models/hmi'
import { Button, Col, Input, Row, Space, Typography } from 'antd'
import React, { useState } from 'react'
import { useModal } from '@ebay/nice-modal-react'
import IotSelectPointModal from "@/components/IotSelectPoint/IotSelectPointModal";

const { Text } = Typography

interface IGaugeHeadProp {
  property: GaugeProperty
}

const GaugeHeadComponent: React.FC<IGaugeHeadProp> = (props) => {
  const initProperty = props.property ? props.property : new GaugeProperty()
  const iotSelectPointModal = useModal(IotSelectPointModal);

  const [property, setProperty] = useState(initProperty)

  const updateSetting = (e, key) => {}
  const handleSelectPoint = () => {
    console.log('ddd')
    iotSelectPointModal.show()
  }
  return (
    <div>
      <Space direction="vertical">
        <Space direction="horizontal">
          <Text>名称：</Text>
          <Input className="viz-input" value={property.name} onChange={(e) => updateSetting(e, 'name')}></Input>
        </Space>
        <Space direction="horizontal">
          <Text>物联网点位：{property.iot?.code}</Text>
          <Button onClick={handleSelectPoint}>选取点位</Button>
        </Space>
      </Space>
    </div>
  )
}

export default React.memo(GaugeHeadComponent)
