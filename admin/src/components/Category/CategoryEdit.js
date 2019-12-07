
import React, { Component, Fragment } from "react"
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
    const {fetchCategoryByIDDispatch, fetchCategoriesDispatch, match:{params:{detail:id}}} = this.props;
    fetchCategoriesDispatch();
    // const id = this.props.match.params.detail;
    if(id) {
      fetchCategoryByIDDispatch(id);
    }
  }
  handleSubmit = (e,id) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // TODO: dispatch
        // let res;
        // try {
        //   if(id) {
        //     res = await Request.axios('put', `/rest/categories/${id}`, values);
        //   } else {
        //     res = await Request.axios('post', '/rest/categories', values);
        //   }
        //   if(res) {
        //     this.props.history.push("/categories/list")
        //   } else {
        //     message.error(res.data)
        //   }
        // } catch (error) {
        //   message.error(error);
        // }
        this.props.addAndUpdateCategoryDispatch(values, id);
      }
    });
  };
  render() {
    console.log("this.props:", this.props.categoryState)
    const { getFieldDecorator } = this.props.form;
    const categoryState = this.props.categoryState;
    console.log("categoryState", categoryState);
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
          initialValue: parents&&parents.category || "",

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

  // fetchCategoryById = async id => {
  //   const item = await Request.axios('get', `/rest/categories/${id}`);
  //   this.setState({
  //     parents: item.parents,
  //     category: item.category
  //   })
  // }

  // fetchCategories = async () => {
  //   const categories = await Request.axios('get', '/rest/categories');
  //   console.log("categoryie", categories);
  //   this.setState({categories})
  // }
}

export default Form.create()(CategoryEdit);
