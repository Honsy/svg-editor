import IotRangeNumber from "@/components/IotRangeNumber/IotRangeNumber";
import { GaugeAction, GaugeProperty, GaugeRangeProperty } from "@/models/hmi";
import { Space } from "antd";
import React, { useEffect, useState } from "react";

interface IGaugeHeadProp {
  property: GaugeProperty
}

const GaugeActionComponent: React.FC<IGaugeHeadProp> = ({ property }) => {
  const [actions, setActions] = useState([])

  const onAddAction = () => {
    let ga: GaugeAction = new GaugeAction();
    ga.range = new GaugeRangeProperty();
    addAction(ga);
  }

  const addAction = (ge: GaugeAction) => {
    actions.push(ge);
    setActions(actions.slice())
  }

  useEffect(() => {
    let actions = []
    if (property) {
      actions = property.actions ? property.actions : []
      actions.map(item => {
        if (!item.actoptions || Object.keys(item.actoptions).length == 0) {
          item.actoptions = {variablesMapping: []};
        }
      })
      setActions(actions)
    }
  
    if (actions.length <= 0) {
      onAddAction();
    }
  }, [])

  return (
    <div className="gauge-action">
      { actions.map(item => {
        return (
          <Space key={item} wrap>
            <div>
              <span>取值范围：</span>
              <IotRangeNumber></IotRangeNumber>
              {/* <Select style={{ width: 120 }} options={eventType}></Select> */}
            </div>
            <div>
              <span>执行动作：</span>
            </div>
            <div>

            </div>
          </Space>
        )
      })}
    </div>
  )
}

export default React.memo(GaugeActionComponent);