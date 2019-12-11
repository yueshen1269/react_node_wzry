
import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Table, Divider, Popconfirm, } from 'antd';


export default function CategoriesList(props) {

  useEffect(() => {
    props.fetchCategoriesFromStore();
  }, []);

  const columns = [
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
          <a onClick={() => handleEdit(record)}>edit</a>
          <Divider type="vertical" />
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
            <a>Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  function handleEdit(record) {
    let {_id} = record;
    props.handleEdit(_id);
  }

  function handleDelete(_id) {
    props.handleDelete(_id);
  }

  const {items} = props.categoryState;

  return (
  <>
    <Table
      rowKey = {record => record._id}
      columns={columns}
      dataSource={items}
    />
  </>)
}

CategoriesList.propTypes = {
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  fetchCategoriesFromStore: PropTypes.func,
  categoryState: PropTypes.object,
}

CategoriesList.defaultProps = {
  handleEdit() {},
  handleDelete() {},
  fetchCategoriesFromStore() {},
  categoryState: {},
}
