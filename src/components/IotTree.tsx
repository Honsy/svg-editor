import { Tree } from "antd";
import React, { useEffect, useState } from "react";
import { getPointTree } from "@/apis/iot.api";

interface IotTreeProps {
  onTreeNodeClick: (selectedKeys: any, info: any) => void
}

interface IotTreeState {
  treeData: any
}

const IotTree: React.FC<IotTreeProps> = (props) => {
  const [treeData, setTreeData] = useState([])
  
  const getData = () => {
    // const params = {
    //   type: "sensor"
    // }
    // getPointTree(params).then((res: any)=>{
    //   setTreeData(res.result)
    // })
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div>
      <Tree
          fieldNames={{title: 'name',key: 'id'}}
          treeData={treeData}
          onSelect={props.onTreeNodeClick}>
        </Tree>
    </div>
  )
}

export default React.memo(IotTree);