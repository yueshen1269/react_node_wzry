
import React, { Component } from "react"
import Request from "../../../utils/request"
import { Table, Divider, Popconfirm, message } from 'antd';


export default class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
    this.columns = [
      {
        title: 'id',
        dataIndex: '_id',
        key: '_id',
        width: 150,
      },
      {
        title: 'title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={() => this.handleEdit(record)}>edit</a>
            <Divider type="vertical" />
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record._id)}>
              <a>Delete</a>
            </Popconfirm>
          </span>
        ),
      },
    ];
  }
  async componentDidMount() {
    const data = await Request.axios('get', '/rest/articles');
    this.setState({data})
  }
  render() {
    const {data} = this.state;
    return (
    <>
      <Table
        rowKey = {record => record._id}
        columns={this.columns}
        dataSource={data}
      />
    </>)
  }

  handleEdit = (record) => {
    let {_id} = record;
    this.props.history.push(`/articles/edit/${_id}`)
  }

  handleDelete = async (_id) => {
    await Request.axios('delete', `/rest/articles/${_id}`);
    const data = await Request.axios('get', '/rest/articles');
    this.setState({data});
    message.success("delete successfully")
  }
}
