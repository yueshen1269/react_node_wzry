
import React, { Component, Fragment } from "react"
import { Form, Input, Button, message } from "antd"
import Request from "../../../utils/request"



class CreateClass extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const res = await Request.axios('post', '/categories', values);
          if(res) {
            this.props.history.push("/categories/list")
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
    <Fragment>
      <h1>新建分类</h1>
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
      <Form.Item label="名称" hasFeedback>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入名称',
              },

            ],
          })(<Input  />)}
        </Form.Item>
        <Form.Item {...formTailLayout}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Fragment>

    )
  }
}

export default Form.create()(CreateClass);
