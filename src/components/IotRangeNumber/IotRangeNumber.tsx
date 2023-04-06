import { Input, Space } from "antd"
import React, { useState } from "react"

interface IotRangeNumberProps {

}

interface IItemRange {
  min: number;
  max: number;
}

const IotRangeNumber: React.FC<IotRangeNumberProps> = (props) => {
  const [range, setRange] = useState({} as IItemRange)

  const handleValueChange = () => {
    
  }

  return (
    <div className="range-container" style={{width: 200}}>
      <Space wrap>
        <div>
          <span>最小值：</span>
          <Input width={80} name="min" value={range.min} onChange={handleValueChange}></Input>
        </div>
        <div>
          <span>最大值：</span>
          <Input width={80} name="max" value={range.max} onChange={handleValueChange}></Input>
        </div>
      </Space>
    </div>
  )
}


export default React.memo(IotRangeNumber)
