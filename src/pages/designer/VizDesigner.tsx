import React, { useState } from "react";
import LeftPanel from "./components/leftPanel/LeftPanel";
import RightPanel from "./components/rightPanel/RightPanel";
import TopPanel from "./components/topPanel/TopPanel";
import Editor from "./components/editor/Editor";
import Designer from "@/adapter/designer";
import "./viz.designer.scss";

export const designer = new Designer();

const VizDesigner: React.FC<any> = ({}) => {
  const [currentMode, setCurrentMode] = useState('')

  return (
    <div className="iv-designer">
      <TopPanel></TopPanel>
      <div className="iv-designer-container">
        <LeftPanel></LeftPanel>
        <Editor></Editor>
        <RightPanel></RightPanel>
      </div>
    </div>
  )
}

export default React.memo(VizDesigner)
