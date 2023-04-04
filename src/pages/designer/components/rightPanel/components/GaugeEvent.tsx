import { GaugeProperty } from "@/models/hmi";
import React from "react";

interface IGaugeHeadProp {
  property: GaugeProperty
}

const GaugeEventComponent: React.FC<IGaugeHeadProp> = ({}) => {

  return (
    <div>
      
    </div>
  )
}

export default React.memo(GaugeEventComponent);