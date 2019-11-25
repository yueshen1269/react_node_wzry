
import React, { Component } from "react"
import Request from "../../../utils/request"
import { Table, Divider, Popconfirm, message } from 'antd';


export default class HeroesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
    this.columns = [
      {
        title: 'heroId',
        dataIndex: 'heroId',
        key: '_id',
        width: 150,
      },
      {
        title: '英雄',
        dataIndex: 'name',
        key: 'item',
      },
      {
        title: 'avatar',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, record) => (
          <img src={record.avatar} alt="avatar" style={{height: "3rem"}}/>
        )
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
    const data = await Request.axios('get', '/rest/heroes');
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
    this.props.history.push(`/heroes/edit/${_id}`)
  }

  handleDelete = async (_id) => {
    await Request.axios('delete', `/rest/heroes/${_id}`);
    const data = await Request.axios('get', '/rest/heroes');
    this.setState({data});
    message.success("delete successfully")
  }
}
