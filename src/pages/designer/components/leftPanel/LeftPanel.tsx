import React, { useEffect, useRef, useState } from 'react'
import { Button, Collapse, Dropdown, MenuProps, Tooltip } from 'antd'
import { controls, generals } from './config'
import Designer from '@/adapter/designer'
import './leftpanel.scss'
import { Events } from '@/events/event'
import { Hmi, View } from '@/models/hmi'
import { designer } from '../../DesignerPage'
import AddView, { AddViewModel } from '../addView/addView'
import useModal from '@/hooks/ui/useModal'
import { EditorSelectView } from '@/events/event.data'

const { Panel } = Collapse

export interface ILeftPanelProp {}

const LeftPanel: React.FC<ILeftPanelProp> = ({}) => {
  const [addViewVisible, setAddViewVisible] = useState(false)
  const [hmi, setHMI] = useState<Hmi>(null)
  const [addViewForm, setAddViewForm] = useState<AddViewModel>({ name: '' })
  const [currentView, setCurrentView] = useState<View>(null)
  // 当前编辑器模式
  const [currentMode, setCurrentMode] = useState<View>(null)
  const operates = ['删除', '重命名', '属性', '克隆', '导出']
  const items: MenuProps['items'] = operates.map((item, index) => {
    return {
      label: item,
      key: item,
      index
    }
  })

  useEffect(() => {
    designer.on(Events.EDITOR_HMI_LOADED, handleHmiLoaded)
    designer.on(Events.EDITOR_SELECT_VIEW, handleSelectViewChange)
  }, [])

  const handleOperateClick = (e) => {}

  const showMenus = (item) => {}
  // 按钮触发模式更改
  const handleSetMode = (mode) => {
    setCurrentMode(mode)
    designer.setMode(mode)
  }
  const isModeActive = (mode) => {
    return currentMode === mode
  }
  // 加载视图
  const handleHmiLoaded = (event, data) => {
    setHMI(data.hmi)
  }
  // 选中视图改变
  const handleSelectViewChange = (event, data: EditorSelectView) => {
    setCurrentView(data.view)
  }
  // 选中视图
  const onSelectView = (item) => {
    designer.onSelectView(item)
  }
  // 当前视图是否激活
  const isViewActive = (item: View) => {
    return currentView ? currentView.id === item.id : false
  }

  return (
    <div className="iv-leftpanel">
      <AddView modalVisible={addViewVisible} onCancel={() => setAddViewVisible(false)} values={addViewForm}></AddView>
      <div className="iv-leftpanel-views">
        <div className="iv-views-header">
          <p>视图</p>
          <div>
            <Button type="link" onClick={() => setAddViewVisible(true)}>
              添加
            </Button>
          </div>
        </div>
        {hmi &&
          hmi.views.map((item, index) => {
            return (
              <div key={`view${index}`} onClick={() => onSelectView(item)} className={['iv-view-item', isViewActive(item) ? 'active' : ''].join(' ')}>
                <span>{item.name}</span>
                <Dropdown trigger={['click']} menu={{ items: items, onClick: handleOperateClick }}>
                  <a onClick={() => showMenus(item)}>更多</a>
                </Dropdown>
              </div>
            )
          })}
      </div>
      <Collapse className="iv-components iot-collapse" defaultActiveKey={['1', '2', '3']}>
        <Panel header="通用组件" key="2">
          <div className="iv-panel-block">
            {generals.map((item) => {
              return (
                <Tooltip title={item.tooltip} key={item.value}>
                  <div className={['svg-tool-button', isModeActive(item.value) ? 'svg-tool-active' : ''].join(' ')} onClick={() => handleSetMode(item.value)}>
                    <span className={item.icon}></span>
                  </div>
                </Tooltip>
              )
            })}
            <div className={['svg-tool-button', isModeActive('image') || isModeActive('svg-image') ? 'svg-tool-active' : ''].join(' ')} onClick={() => handleSetMode('image')}>
              <span className="icon-image"></span>
              <input type="file" style={{ display: 'none' }} onChange={(e) => designer.onSetImage(e)} accept="image/png|jpg|svg" />
            </div>
          </div>
        </Panel>
        <Panel header="自定义组件" key="3">
          <div className="iv-panel-block">
            {controls.map((item) => {
              return (
                <Tooltip title={item.tooltip} key={item.value}>
                  <div className={['svg-tool-button', isModeActive(item.value) ? 'svg-tool-active' : ''].join(' ')} onClick={() => handleSetMode(item.value)}>
                    <span className={item.icon}></span>
                  </div>
                </Tooltip>
              )
            })}
            <div className={['svg-tool-button', isModeActive('image') || isModeActive('svg-image') ? 'svg-tool-active' : ''].join(' ')} onClick={() => handleSetMode('image')}>
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
