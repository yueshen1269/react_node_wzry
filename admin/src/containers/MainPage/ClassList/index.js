
import React, { Component } from "react"
import Request from "../../../utils/request"
import { Table, Divider, Popconfirm, message } from 'antd';


export default class ClassList extends Component {
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
        title: 'category',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: 'parent',
        dataIndex: 'parents.category',
        key: 'parent',
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
  async componentWillMount() {
    const data = await Request.axios('get', '/rest/categories');
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
    let {_id, category} = record;
    if(!category) category = "";
    this.props.history.push(`/categories/edit/${_id}_${category}`)
  }

  handleDelete = async (_id) => {
    await Request.axios('delete', `/rest/categories/${_id}`);
    const data = await Request.axios('get', '/rest/categories');
    this.setState({data});
    message.success("delete successfully")
  }
}
