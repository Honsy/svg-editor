import React, { useState } from "react";
import LeftPanel from "./components/leftPanel/LeftPanel";
import RightPanel from "./components/rightPanel/RightPanel";
import TopPanel from "./components/topPanel/TopPanel";
import Editor from "./components/editor/Editor";
import Designer from "@/adapters/designer";
import "./viz.designer.scss";

const VizDesigner: React.FC<any> = ({}) => {
  console.log('ddd')
  const [currentMode, setCurrentMode] = useState('')
  
  const designer = new Designer();

  return (
    <div className="iv-designer">
      <TopPanel></TopPanel>
      <div className="iv-designer-container">
        <LeftPanel designer={designer}></LeftPanel>
        <Editor designer={designer}></Editor>
        <RightPanel></RightPanel>
      </div>
    </div>
  )
}

export default React.memo(VizDesigner)
