import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import IotTree from '../IotTree'
import "./iot-select-point.scss"

interface IotSelectPointProps {}

const IotSelectPoint: React.FC<IotSelectPointProps> = (props) => {
  const colums = [
    {
      title: '点位编码',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '点位名称',
      dataIndex: 'deviceName',
      key: 'deviceName'
    },
    {
      title: '点位状态',
      dataIndex: 'online',
      key: 'online'
    },
    {
      title: '点位类型',
      dataIndex: 'ctrType',
      key: 'ctrType'
    }
  ]
  const [queryCondition, setQueryCondition] = useState({
    categoryId: -1,
    pageSize: 10,
    pageNum: 1
  })
  const [tableData, setTableData] = useState([])
  const [total, setTotal] = useState(0)
  const onTreeNodeClick = (selectedKeys, info) => {
    setQueryCondition({
      ...queryCondition,
      categoryId: info.node.id
    })
  }
  const getData = () => {}
  const onSelectChange = () => {}
  useEffect(() => {
    getData()
  }, [queryCondition])

  return (
    <div className="iot-select-point">
      <div className="iot-select-point-tree">
        <IotTree onTreeNodeClick={(selectedKeys, info) => onTreeNodeClick(selectedKeys, info)}></IotTree>
      </div>
      <div className="iot-select-point-table">
        <Table
          rowSelection={{ type: 'radio', onChange: onSelectChange }}
          rowKey={'id'}
          className="viz-table autoy"
          columns={colums}
          dataSource={tableData}
          pagination={{ total: total }}
          scroll={{ y: 'calc(100% - 50px)' }}
        ></Table>
      </div>
    </div>
  )
}

export default React.memo(IotSelectPoint)
