import React, { useEffect, useState } from "react";
import LeftPanel from "./components/leftPanel/LeftPanel";
import RightPanel from "./components/rightPanel/RightPanel";
import TopPanel from "./components/topPanel/TopPanel";
import Editor from "./components/editor/Editor";
import Designer from "@/adapter/designer";
import "./designer.page.scss";
import { service } from "@/services/service";

export const designer = new Designer();

const VizDesigner: React.FC<any> = ({}) => {
  const [currentMode, setCurrentMode] = useState('')
  useEffect(() => {
    service.themeService.setTheme(service.projectService.getLayoutTheme());
  }, [])
  return (
    <div className="iv-designer">
      <TopPanel></TopPanel>
      {/* Not visible, but useful */}
      <input id="text" style={{width:0, height:0,opacity: 0}}/>
      <div className="iv-designer-container">
        <LeftPanel></LeftPanel>
        <Editor></Editor>
        <RightPanel></RightPanel>
      </div>
    </div>
  )
}

export default React.memo(VizDesigner)
