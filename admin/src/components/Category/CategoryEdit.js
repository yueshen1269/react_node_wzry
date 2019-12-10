
import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { Form, Input, Button, message, Select } from "antd"

const {Option} = Select;

class CategoryEdit extends Component {
  constructor(props) {
    super(props);
    this.state={
      // categories: []
    }
  }
  componentDidMount() {
    const {fetchCategoryByID, fetchCategories, match:{params:{detail:id}}} = this.props;
    fetchCategories();
    // const id = this.props.match.params.detail;
    if(id) {
      fetchCategoryByID(id);
    }
  }
  handleSubmit = (e,id) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.addAndUpdateCategory(values, id);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const categoryState = this.props.categoryState;
    const {item, items} = categoryState;
    const {parents, category, } = item;
    console.log("dd:", this.props.location, "ff:", this.props.history, "gg:", this.props.match);
    const id = this.props.match.params.detail;
    const formItemLayout = {
      labelCol: {
        xs: { span: 4},
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 8 },
        sm: { span: 8 },
      },
    };
    const formTailLayout = {
      // labelCol: { span: 2 },
      wrapperCol: { span: 2, offset: 2 },
    };
    return (
    <>
      <h1>{id ? "编辑分类" : "新建分类"}</h1>
      <Form {...formItemLayout} onSubmit={(e) => {this.handleSubmit(e, id)}}>
      <Form.Item label="父分类">
        {getFieldDecorator('parents', {
          initialValue: parents && parents._id || "",

        })(
          <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a category"
          optionFilterProp="children"
          // onChange={onChange}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {items.length>0 && items.map(item => (
            <Option
              key={item._id}
              value={item._id}
            >
              {item.category}
            </Option>
          ))}

          </Select>
        )
        }
        </Form.Item>
        <Form.Item label="名称" hasFeedback>
          {getFieldDecorator('category', {
            rules: [
              {
                required: true,
                message: '请输入名称',
              },
            ],
            initialValue: category || "",

          })(<Input  />)}
        </Form.Item>
          <Form.Item {...formTailLayout}>
          <Button
            type="primary"
            htmlType="submit"
          >
            保存
          </Button>
        </Form.Item>
      </Form>
    </>

    )
  }

}

export default Form.create()(CategoryEdit);

CategoryEdit.propTypes = {
  fetchCategoryByID: PropTypes.func,
  fetchCategories: PropTypes.func,
  addAndUpdateCategory: PropTypes.func,
  categoryState: PropTypes.object,
}

CategoryEdit.defaultProps = {
  fetchCategoryByID() {},
  fetchCategories() {},
  addAndUpdateCategory() {},
  categoryState: {},
}
