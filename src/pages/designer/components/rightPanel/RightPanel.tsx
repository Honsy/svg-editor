import Designer from '@/adapter/designer'
import { Events } from '@/events/event'
import { GaugeBaseComponent } from '@/gauge/gaugeBase'
import { Collapse } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { designer } from '../../VizDesigner'
import './rightpanel.scss'

export interface IRightPanelProp {}

const RightPanel: React.FC<IRightPanelProp> = ({}) => {
  let gaugepanel
  const [shadow, setShadow] = useState(0)
  const [selectedElement, setSelectedElement] = useState(null)
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

  const onAlignSelected = (letter: string) => {
    designer.editor.alignSelectedElements(letter.charAt(0))
  }

  const getGaugeSettings = () => {}

  const onGaugeEdit = () => {}
  return (
    <div className="iv-rightpanel">
      <Collapse className="iv-collapse" defaultActiveKey={['1', '2', '3', '4', '5']}>
        <Collapse.Panel header="基础属性" key="1">
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
        </Collapse.Panel>
        <Collapse.Panel header="对齐面板" key="2">
          <div className="iv-right-align iv-panel-block">
            <div className="svg-tool-button" onClick={(e) => onAlignSelected('left')}>
              <span className="icon-align-left"></span>
            </div>
            <div className="svg-tool-button" onClick={(e) => onAlignSelected('center')}>
              <span className="icon-align-center"></span>
            </div>
            <div className="svg-tool-button" onClick={(e) => onAlignSelected('right')}>
              <span className="icon-align-right"></span>
            </div>
            <div className="svg-tool-button" onClick={(e) => onAlignSelected('top')}>
              <span className="icon-align-top"></span>
            </div>
            <div className="svg-tool-button" onClick={(e) => onAlignSelected('middle')}>
              <span className="icon-align-middle"></span>
            </div>
            <div className="svg-tool-button" onClick={(e) => onAlignSelected('bottom')}>
              <span className="icon-align-bottom"></span>
            </div>
          </div>
        </Collapse.Panel>
        <Collapse.Panel header="线条面板" key="3">
          <div className="iv-right-line iv-panel-block">
            <div className="_color_tool">
              <div className="svg-property-split2">
                <div className="svg-property">
                  <span>宽度</span>
                  <input id="stroke_width" type="number" className="rightbar-input" size={4} defaultValue="1" data-attr="Stroke Width" />
                </div>
                <div className="svg-property">
                  <span>样式</span>
                  <select id="stroke_style" className="style-stroke">
                    <option defaultValue="none">&#8212;</option>
                    <option value="2,2">...</option>
                    <option value="5,5">- -</option>
                    <option value="5,2,2,2">- .</option>
                    <option value="5,2,2,2,2,2">- ..</option>
                  </select>
                </div>
                <div className="svg-property">
                  <div className="svg-tool-button" id="linejoin_miter" onClick={(e) => designer.editor.onSetStrokeOption(e)}>
                    <span className="icon-linejoin-miter"></span>
                  </div>
                  <div className="svg-tool-button" id="linejoin_round" onClick={(e) => designer.editor.onSetStrokeOption(e)}>
                    <span className="icon-linejoin-round"></span>
                  </div>
                  <div className="svg-tool-button" id="linejoin_bevel" onClick={(e) => designer.editor.onSetStrokeOption(e)}>
                    <span className="icon-linejoin-bevel"></span>
                  </div>
                </div>
                <div className="svg-property">
                  <div className="svg-tool-button" id="linecap_butt" onClick={(e) => designer.editor.onSetStrokeOption(e)}>
                    <span className="icon-linecap-butt"></span>
                  </div>
                  <div className="svg-tool-button" id="linecap_square" onClick={(e) => designer.editor.onSetStrokeOption(e)}>
                    <span className="icon-linecap-square"></span>
                  </div>
                  <div className="svg-tool-button" id="linecap_round" onClick={(e) => designer.editor.onSetStrokeOption(e)}>
                    <span className="icon-linecap-round"></span>
                  </div>
                </div>
                <div className="svg-property-split2" style={{ display: 'none' }}>
                  <div className="svg-property">
                    <span>阴影</span>
                    <input value={shadow} type="checkbox" id="class_shadow" name="class_shadow" className="attr_changer" onChange={(e) => designer.editor.onSetShadowOption(e)} />
                  </div>
                  <div className="svg-property"></div>
                </div>
              </div>
            </div>
          </div>
        </Collapse.Panel>
        <Collapse.Panel header="标记面板" key="4">
          <div className="iv-right-mark iv-panel-block">
            <div className="svg-property-split3">
              <div className="svg-property">
                <span>开始</span>
                <select id="start_marker" className="style-stroke" onClick={(e) => designer.editor.onSetMarker('start_marker', 0)}></select>
              </div>
              <div className="svg-property">
                <span>中间的</span>
                <select id="mid_marker" className="style-stroke" onClick={(e) => designer.editor.onSetMarker('mid_marker', 0)}></select>
              </div>
              <div className="svg-property">
                <span>结束</span>
                <select id="end_marker" className="style-stroke" onClick={(e) => designer.editor.onSetMarker('end_marker', 0)}></select>
              </div>
            </div>
          </div>
        </Collapse.Panel>
        <Collapse.Panel className="viz-panel-block" header="属性面板" key="5">
          {selectedElement ? <GaugeBaseComponent ref={(base) => (gaugepanel = base)} settings={designer.getGaugeSettings(selectedElement)} onEdit={onGaugeEdit}></GaugeBaseComponent> : null}
        </Collapse.Panel>
      </Collapse>
    </div>
  )
}

export default React.memo(RightPanel)
