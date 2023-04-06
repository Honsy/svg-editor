import { Tabs } from "antd"
import React, { useState } from "react"
import type { TabsProps } from 'antd';
import GaugeHead from "./GaugeHead";
import GaugeAction from "./GaugeAction";
import GaugeEvent from "./GaugeEvent";
import { GaugeProperty } from "@/models/hmi";


interface IGaugePropertyProp {
  data: any
}

const GaugePropertyComponent: React.FC<IGaugePropertyProp> = ({}) => {
  const [property, setProperty] = useState({} as GaugeProperty)

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `属性`,
      children: <GaugeHead property={property}></GaugeHead>,
    },
    {
      key: '2',
      label: `事件`,
      children: <GaugeEvent property={property}></GaugeEvent>,
    },
    {
      key: '3',
      label: `动作`,
      children: <GaugeAction property={property}></GaugeAction>,
    },
  ];
  return (
    <div>
      <Tabs items={items}></Tabs>
    </div>
  )
}

export default React.memo(GaugePropertyComponent)
