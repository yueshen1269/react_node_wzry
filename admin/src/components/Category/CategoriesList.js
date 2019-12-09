
import React, { Component } from "react"
// import Request from "../../utils/request"
import { Table, Divider, Popconfirm, message } from 'antd';


export default class CategoriesList extends Component {
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
    // const data = await Request.axios('get', '/rest/categories');
    // this.setState({data})
    this.props.fetchCategoriesFromStore();
  }
  render() {
    // const {data} = this.state;
    const {items} = this.props.categoryState;
    return (
    <>
      <Table
        rowKey = {record => record._id}
        columns={this.columns}
        dataSource={items}
      />
    </>)
  }

  handleEdit = (record) => {
    let {_id} = record;
    this.props.handleEdit(_id);
    // this.props.history.push(`/categories/edit/${_id}`)
  }

  handleDelete = async (_id) => {
    this.props.handleDelete(_id);
    // await Request.axios('delete', `/rest/categories/${_id}`);
    // const data = await Request.axios('get', '/rest/categories');
    // this.setState({data});
    // message.success("delete successfully")
  }
}
