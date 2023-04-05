import Designer from "@/adapter/designer"
import { service } from "@/services/service"
import { Button } from "antd"
import React, { useRef } from "react"
import "./top-panel.scss"
import { useNavigate } from "react-router-dom";

export interface ITopPanelProp {}


const TopPanel: React.FC<ITopPanelProp> = ({ }) => {
  const navigate = useNavigate();
  const onSave = () => {
    service.projectService.saveProject()
  }

  const onPreview = () => {
    service.projectService.saveProject()
    navigate('/preview')
  }

  return (
    <div className="iv-designer-header flex">
      <div className="header-left">

      </div>
      <div className="header-center flex">
        <Button>网格</Button>
        <Button>上一步</Button>
        <Button>下一步</Button>
        <Button>导入</Button>
        <Button>导出</Button>
      </div>
      <div className="header-right flex">
        <Button type="primary" onClick={onSave}>保存</Button>
        <Button onClick={onPreview}>预览</Button>
      </div>
    </div>
  )
}

export default React.memo(TopPanel)