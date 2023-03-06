import React, { useRef, useState } from 'react'
import { Collapse, Tooltip } from 'antd'
import { generals } from './config'
import Designer from '@/adapter/designer'
import "./leftpanel.scss";
const { Panel } = Collapse

export interface ILeftPanelProp {
  designer: Designer
}

const LeftPanel: React.FC<ILeftPanelProp> = ({ designer }) => {
  const [hmi, setHMI] = useState(null)
  // const [designer, setDesigner] = useState(null);
  console.log(generals)
  return (
    <div className="iv-leftpanel">
      <Collapse defaultActiveKey={['1']}>
        <Panel header="通用组件" key="2">
          <div className="iv-panel-block">
            {generals.map((item) => {
              return (
                <Tooltip title={item.tooltip} key={item.value}>
                  <div className={['svg-tool-button', designer.isModeActive(item.value) ? 'svg-tool-active' : ''].join(' ')} onClick={() => designer.setMode(item.value)}>
                    <span className={item.icon}></span>
                  </div>
                </Tooltip>
              )
            })}
            <div className={['svg-tool-button', designer.isModeActive('image') || designer.isModeActive('svg-image') ? 'svg-tool-active' : ''].join(' ')} onClick={() => designer.setMode('image')}>
              <span className="icon-image"></span>
              <input type="file" style={{ display: 'none' }} onChange={(e) => designer.onSetImage(e)} accept="image/png|jpg|svg" />
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  )
}

export default React.memo(LeftPanel)
