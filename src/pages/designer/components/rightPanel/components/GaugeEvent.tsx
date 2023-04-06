import { GaugeActionsType, GaugeEvent, GaugeEventType, GaugeProperty } from "@/models/hmi";
import { Select, Space } from "antd";
import React, { useEffect, useState } from "react";

interface IGaugeHeadProp {
  property: GaugeProperty
}

const GaugeEventComponent: React.FC<IGaugeHeadProp> = ({ property }) => {
  const eventType = Object.keys(GaugeEventType).map(item => ({
    value: item, label: GaugeEventType[item]
  }));
  const actionType = Object.keys(GaugeActionsType).map(item => ({
    value: item, label: GaugeActionsType[item]
  }));
  const [events, setEvents] = useState([])
  
  const onAddEvent = () => {
    let ga: GaugeEvent = new GaugeEvent();
    addEvent(ga);
  }

  const addEvent = (ge: GaugeEvent) => {
    events.push(ge);
    setEvents(events.slice())
  }

  useEffect(() => {
    let events = []
    if (property) {
      events = property.events ? property.events : []
      events.map(item => {
        if (!item.actoptions || Object.keys(item.actoptions).length == 0) {
          item.actoptions = {variablesMapping: []};
        }
      })
      setEvents(events)
    }
  
    if (events.length <= 0) {
      onAddEvent();
    }
  }, [])

  return (
    <div className="gauge-event">
      { events.map(item => {
        return (
          <Space key={item} wrap>
            <div>
              <span>触发类型：</span>
              <Select style={{ width: 120 }} options={eventType}></Select>
            </div>
            <div>
              <span>执行动作：</span>
              <Select style={{ width: 120 }} options={actionType}></Select>
            </div>
          </Space>
        )
      })}
    </div>
  )
}

export default React.memo(GaugeEventComponent);