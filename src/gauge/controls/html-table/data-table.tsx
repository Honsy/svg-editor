import { Table } from "antd";
import type { ColumnsType } from 'antd/es/table';

import React from "react";

interface DataType {
  key: string;
  name: string;
  age: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];
const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
  },
];
export class DataTableComponent extends React.Component {

  constructor(props) {
    super(props)
  }

  render(): React.ReactNode {
      return (
        <Table columns={columns} dataSource={data} />
      )
  }
}