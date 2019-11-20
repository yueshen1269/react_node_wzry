
import React, { Component, Fragment } from "react"
import { Form, Input, Button, message } from "antd"
import Request from "../../../utils/request"



class CreateClass extends Component {
  constructor(props) {
    super(props);
  }
  handleSubmit = (e,id) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let res;
        try {
          if(id) {
            res = await Request.axios('put', `/categories/${id}`, values);
          } else {
            res = await Request.axios('post', '/categories', values);
          }
          if(res) {
            console.log("this:",this);
            this.props.history.push("/categories/list");
          } else {
            message.error(res.data)
          }
        } catch (error) {
          message.error(error);
        }
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    console.log("dd:", this.props.location, "ff:", this.props.history, "gg:", this.props.match);
    const params = this.props.match.params;
    let id, category;
    if(JSON.stringify(params) !== "{}") {
      [id, category] = params.detail.split("_");
    }
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

export default Form.create()(CreateClass);
