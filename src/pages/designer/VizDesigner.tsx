import React, { useState } from "react";
import LeftPanel from "./components/leftPanel/LeftPanel";
import RightPanel from "./components/rightPanel/RightPanel";
import TopPanel from "./components/topPanel/TopPanel";
import Editor from "./components/editor/Editor";
import Designer from "@/adapter/designer";
import "./viz.designer.scss";

const VizDesigner: React.FC<any> = ({}) => {
  const [currentMode, setCurrentMode] = useState('')
  
  const designer = new Designer();

  return (
    <div className="iv-designer">
      <TopPanel designer={designer}></TopPanel>
      <div className="iv-designer-container">
        <LeftPanel designer={designer}></LeftPanel>
        <Editor designer={designer}></Editor>
        <RightPanel designer={designer}></RightPanel>
      </div>
    </div>
  )
}

export default React.memo(VizDesigner)
