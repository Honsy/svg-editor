import { GaugeProperty } from "@/models/hmi";
import { Button, Col, Input, Row, Typography } from "antd";
import React, { useState } from "react";

const { Text } = Typography

interface IGaugeHeadProp {
  property: GaugeProperty
}

const GaugeHeadComponent: React.FC<IGaugeHeadProp> = (props) => {
  const initProperty = props.property ? props.property : new GaugeProperty();

  const [property, setProperty] = useState(initProperty);

  const updateSetting = (e, key) => {

  }

  return (
    <div>
      <Row gutter={24}>
        <Col className="gutter-row" span={6}>
          <Input className="viz-input" value={property.name} onChange={(e) => updateSetting(e, 'name')}></Input>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col>
          <Text>物联网点位：{property.iot.code}</Text>
          <Button>选取点位</Button>
        </Col>
      </Row>
    </div>
  )
}

export default React.memo(GaugeHeadComponent);