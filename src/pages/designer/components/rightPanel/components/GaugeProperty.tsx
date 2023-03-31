import { Tabs } from "antd"
import React from "react"
import type { TabsProps } from 'antd';
import GaugeHead from "./GaugeHead";
import GaugeAction from "./GaugeAction";
import GaugeEvent from "./GaugeEvent";


interface IGaugePropertyProp {}

const GaugePropertyComponent: React.FC<IGaugePropertyProp> = ({}) => {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `属性`,
      children: <GaugeHead></GaugeHead>,
    },
    {
      key: '2',
      label: `事件`,
      children: <GaugeAction></GaugeAction>,
    },
    {
      key: '3',
      label: `动作`,
      children: <GaugeEvent></GaugeEvent>,
    },
  ];
  return (
    <div>
      <Tabs items={items}></Tabs>
    </div>
  )
}

export default React.memo(GaugePropertyComponent)
