import Designer from "@/adapter/designer"
import { service } from "@/services/service"
import { Button } from "antd"
import React, { useRef } from "react"

export interface ITopPanelProp {}


const TopPanel: React.FC<ITopPanelProp> = ({ }) => {
  
  const onSave = () => {
    console.log('dd11')
    service.projectService.saveProject()
  }

  return (
    <div className="iv-designer-header">
      <Button>网格</Button>
      <Button>上一步</Button>
      <Button>下一步</Button>
      <Button>导入</Button>
      <Button>导出</Button>
      <Button onClick={() => onSave()}>保存</Button>
    </div>
  )
}

export default React.memo(TopPanel)