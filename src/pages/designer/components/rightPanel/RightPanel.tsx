import Designer from '@/adapter/designer'
import { Events } from '@/events/event'
import React, { useEffect, useRef } from 'react'

export interface IRightPanelProp {
  designer: Designer
}

const RightPanel: React.FC<IRightPanelProp> = ({ designer }) => {
  const handleEditorInit = () => {
    designer.initPropertyListener()
  }
  console.log('start listener')
  // designer.on(Events.EDITOR_LOADED, handleEditorInit)

  // 初始化通用属性监听
  useEffect(() => {
    handleEditorInit()
    // designer.on(Events.EDITOR_LOADED, handleEditorInit)
  }, [])

  return (
    <div className="iv-rightpanel">
      <div className="iv-right-general iv-panel-block">
        {/* 坐标 */}
        <div id="xy_panel" className="_toolset">
          <div className="svg-property-split2">
            <div className="svg-property">
              <span>x坐标</span>
              <input id="selected_x" className="attr_changer rightbar-input" type="number" size={4} data-attr="x" />
            </div>
            <div className="svg-property">
              <span>y坐标</span>
              <input id="selected_y" className="attr_changer rightbar-input" type="number" size={4} data-attr="y" />
            </div>
          </div>
        </div>
        {/* 线条 */}
        <div id="line_panel">
          <div className="svg-property-split2">
            <div className="svg-property">
              <span>x1</span>
              <input id="line_x1" className="attr_changer rightbar-input" type="number" size={4} data-attr="x1" />
            </div>
            <div className="svg-property">
              <span>y1</span>
              <input id="line_y1" className="attr_changer rightbar-input" type="number" size={4} data-attr="y1" />
            </div>
          </div>
          <div className="svg-property-split2">
            <div className="svg-property">
              <span>x2</span>
              <input id="line_x2" className="attr_changer rightbar-input" type="number" size={4} data-attr="x2" />
            </div>
            <div className="svg-property">
              <span>y2</span>
              <input id="line_y2" className="attr_changer rightbar-input" type="number" size={4} data-attr="y2" />
            </div>
          </div>
        </div>
        {/* 形状 */}
        <div id="rect_panel">
          <div className="svg-property-split2">
            <div className="svg-property">
              <span>width</span>
              <input id="rect_width" className="attr_changer rightbar-input" type="number" size={4} data-attr="width" />
            </div>
            <div className="svg-property">
              <span>height</span>
              <input id="rect_height" className="attr_changer rightbar-input" type="number" size={4} data-attr="height" />
            </div>
          </div>
          <div className="svg-property-split2">
            <div className="svg-property">
              <span>radiuscorner</span>
              <input id="rect_rx" size={4} defaultValue="0" type="number" className="rightbar-input" data-attr="Corner Radius" />
            </div>
          </div>
        </div>
        <div id="htmlctrl_panel">
          <div className="svg-property-split2">
            <div className="svg-property">
              <span>width</span>
              <input id="htmlctrl_width" type="number" className="attr_changer rightbar-input" size={4} data-attr="width" />
            </div>
            <div className="svg-property">
              <span>height</span>
              <input id="htmlctrl_height" type="number" className="attr_changer rightbar-input" size={4} data-attr="height" />
            </div>
          </div>
        </div>
        <div id="shape_panel">
          <div className="svg-property-split2">
            <div className="svg-property">
              <span>width</span>
              <input id="shape_width" type="number" className="attr_changer rightbar-input" size={4} data-attr="width" />
            </div>
            <div className="svg-property">
              <span>height</span>
              <input id="shape_height" type="number" className="attr_changer rightbar-input" size={4} data-attr="height" />
            </div>
          </div>
        </div>
        <div id="circle_panel">
          <div className="svg-property-split2">
            <div className="svg-property">
              <span>cx</span>
              <input id="circle_cx" type="number" className="attr_changer rightbar-input" size={4} data-attr="cx" />
            </div>
            <div className="svg-property">
              <span>cy</span>
              <input id="circle_cy" type="number" className="attr_changer rightbar-input" size={4} data-attr="cy" />
            </div>
          </div>
          <div className="svg-property-split2">
            <div className="svg-property">
              <span>circler</span>
              <input id="circle_r" type="number" className="attr_changer rightbar-input" size={4} data-attr="r" />
            </div>
          </div>
        </div>
        <div id="ellipse_panel">
          <div className="svg-property-split2">
            <div className="svg-property">
              <span>ellipsecx</span>
              <input id="ellipse_cx" type="number" className="attr_changer rightbar-input" size={4} data-attr="cx" />
            </div>
            <div className="svg-property">
              <span>ellipsecy</span>
              <input id="ellipse_cy" type="number" className="attr_changer rightbar-input" size={4} data-attr="cy" />
            </div>
          </div>
          <div className="svg-property-split2">
            <div className="svg-property">
              <span>ellipserx</span>
              <input id="ellipse_rx" type="number" className="attr_changer rightbar-input" size={4} data-attr="rx" />
            </div>
            <div className="svg-property">
              <span>ellipsery</span>
              <input id="ellipse_ry" type="number" className="attr_changer rightbar-input" size={4} data-attr="ry" />
            </div>
          </div>
        </div>
        <div id="image_panel">
          <div className="svg-property-split2">
            <div className="svg-property">
              <span>width</span>
              <input id="image_width" type="number" className="attr_changer rightbar-input" size={4} data-attr="width" />
            </div>
            <div className="svg-property">
              <span>height</span>
              <input id="image_height" type="number" className="attr_changer rightbar-input" size={4} data-attr="height" />
            </div>
          </div>
          <div className="svg-property" style={{ display: 'none' }}>
            <div className="svg-property">
              <span>url</span>
              <input id="image_url" className="attr_changer" type="text" />
            </div>
            <div className="svg-property">
              <div className="svg-property">
                <button id="change_image_url" style={{ display: 'none' }}>
                  更改图像
                </button>
                <span id="url_notice"></span>
              </div>
            </div>
          </div>
        </div>
        <div id="tool_angle" className="svg-property">
          <div className="svg-property-split2">
            <div className="svg-property">
              <span>角度</span>
              <input id="angle" size={4} defaultValue="0" type="number" className="rightbar-input" />
            </div>
            <div className="svg-property"></div>
          </div>
          <div className="svg-property-split2">
            <div className="svg-property">
              <span>透明度</span>
              <input id="blur" size={4} defaultValue="0" type="number" className="rightbar-input" />
            </div>
            <div className="svg-property"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(RightPanel)
