
import React, { Component } from "react"
import Request from "../../../utils/request"
import { Table, Divider } from 'antd';



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
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={() => this.handleEdit(text, record)}>edit</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleDelete(text, record)}>Delete</a>
          </span>
        ),
      },
    ];
  }
  async componentWillMount() {
    const data = await Request.axios('get', '/categories');
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

  handleEdit = (text, record) => {
    let {_id, category} = record;
    if(!category) category = "";
    this.props.history.push(`/categories/edit/${_id}_${category}`)
    // console.log("text:",text,"record:", record);
  }

  handleDelete = async (text, record) => {
    let {_id} = record;
    await Request.axios('delete', `/categories/${_id}`);
    const data = await Request.axios('get', '/categories');
    this.setState({data})
  }
}
