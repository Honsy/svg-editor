import React, { useState } from "react"
import IotTree from "./IotTree"

interface IotSelectPointProps {

}

const IotSelectPoint: React.FC<IotSelectPointProps> = (props) => {
  const [queryCondition, setQueryCondition] = useState({
    categoryId: -1,
    pageSize: 10,
    pageNum: 1
  })

  const onTreeNodeClick = (selectedKeys, info) => {
    setQueryCondition({
      ...queryCondition,
      categoryId: info.node.id
    })
  }

  return (
    <div className="iot-select-point">
    <div className="iot-select-point-tree">
      <IotTree onTreeNodeClick={(selectedKeys, info) => onTreeNodeClick(selectedKeys, info)()}></IotTree>
      </div>
      </div>
  )
}

export default React.memo(IotSelectPoint)