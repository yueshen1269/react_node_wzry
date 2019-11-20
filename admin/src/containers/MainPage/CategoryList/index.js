
import React, { Component, Fragment } from "react"
import { Table } from "antd"
import Request from "../../../utils/request"

export default class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state={
      data: [],
    }

  }
  async componentDidMount() {
    const res = await Request.axios("get", "/categories");
    console.log(res.data)
    this.setState({"data": res})
  }
  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: '_id',
      },
      {
        title: '分类',
        dataIndex: 'name',
      },
    ];
    return (
      <Fragment>
        <h1>分类列表</h1>
        <Table  columns={columns} dataSource={this.state.data } />
      </Fragment>
    )
  }
}
