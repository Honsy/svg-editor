import Designer from "@/adapter/designer";
import React, { useEffect, useRef } from "react"
import { designer } from "../../VizDesigner";

export interface ILeftPanelProp {}

const Editor: React.FC<ILeftPanelProp> = ({ }) => {
  const editor = useRef(null);

  useEffect(() => {
    editor.current && designer.init(editor.current)
  }, [])

  
  return (
    
    <div id="svg_editor" className="iv-editor" ref={editor}>
      <div className="svg_editor">
      <div id="ruler_corner"></div>
        <div id="ruler_x">
          <div>
            <canvas height="15"></canvas>
          </div>
        </div>
        <div id="ruler_y">
          <div>
            <canvas width="15"></canvas>
          </div>
        </div>
        <div id="workarea">
          <div id="svgcanvas"></div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Editor)