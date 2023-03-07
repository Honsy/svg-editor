import React, { useRef, useState } from 'react'
import { Collapse, Dropdown, MenuProps, Tooltip } from 'antd'
import { generals } from './config'
import Designer from '@/adapter/designer'
import "./leftpanel.scss";
import { Events } from '@/events/event';
import { Hmi } from '@/models/hmi';
const { Panel } = Collapse

export interface ILeftPanelProp {
  designer: Designer
}

const LeftPanel: React.FC<ILeftPanelProp> = ({ designer }) => {
  const [hmi, setHMI] = useState<Hmi>(null)
  const operates = ['删除', '重命名', '属性', '克隆', '导出']
  const items: MenuProps['items'] = operates.map((item, index) => {
    return {
      label: item,
      key: item,
      index
    }
  })
  const handleHmiLoaded = (event, data) => {
    setHMI(data.hmi);
  }

  const onSelectView = (item) => {
    designer.onSelectView(item);
  }
  const isViewActive = (item) => {
    return false
  }
  const handleOperateClick = () => {

  }

  const showMenus = (item) => {

  }

  designer.on(Events.EDITOR_HMI_LOADED, handleHmiLoaded)

  return (
    <div className="iv-leftpanel">
      <div className='iv-leftpanel-views'>
        {
          hmi && (
            hmi.views.map((item, index) => {
              return (
                <div key={`view${index}`} onClick={() => onSelectView(item)} className={['viz-view-item', isViewActive(item) ? 'leftbar-item-active' : ''].join(' ')}>
                  <span>{item.name}</span>
                  <Dropdown trigger={['click']} menu={{ items: items, onClick: handleOperateClick }}>
                    <a onClick={() => showMenus(item)}>更多</a>
                  </Dropdown>
                </div>
              )
            })
          )
        }
      </div>
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
