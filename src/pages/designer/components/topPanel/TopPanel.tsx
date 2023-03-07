import { Button } from "antd"
import React, { useRef } from "react"

const TopPanel: React.FC<any> = ({}) => {
  
  return (
    <div className="iv-designer-header">
      <Button>网格</Button>
      <Button>上一步</Button>
      <Button>下一步</Button>
      <Button>导入</Button>
      <Button>导出</Button>
    </div>
  )
}

export default React.memo(TopPanel)