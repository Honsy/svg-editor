import Designer from '@/adapter/designer'
import React, { useEffect, useRef } from 'react'
import { designer } from '../../VizDesigner'

export interface ILeftPanelProp {}

const Editor: React.FC<ILeftPanelProp> = ({}) => {
  const editor = useRef(null)

  useEffect(() => {
    editor.current && designer.init(editor.current)
  }, [])

  return (
    <div className="iv-editor">
      <div id="svg_editor" ref={editor}>
        <div className="svg_editor">
          <div id="rulers">
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
          </div>
          <div id="workarea">
            <div id="svgcanvas"></div>
          </div>
          <div className="bottom-bar tools_panel">
            <input id="text" type="text" size={35} />
            <div id="tools_bottom_2" className="colors">
              <div className="color_tool" id="tool_fill" hidden>
                <label className="icon_label"></label>
                <div className="color_block">
                  <div id="fill_color" className="color_block"></div>
                </div>
              </div>
              <div className="color_tool" id="tool_stroke" hidden>
                <label className="icon_label"></label>
                <div className="color_block">
                  <div id="stroke_bg"></div>
                  <div id="stroke_color" className="color_block"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Editor)
