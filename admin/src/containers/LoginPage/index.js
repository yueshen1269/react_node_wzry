import React, { Component } from "react"
import { Card, Form, message, Button, Input } from 'antd';
import Request from "../../utils/request"
import store from "../../redux/store"

class Login extends Component {

  constructor(props) {
    super(props);
    this.state={
      username: "",
      password: "",
    }
  }
  componentDidMount(){
    console.log("mount login page", this.props);
  }
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 5},
        sm: { span: 3 },
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
    const {username, password} = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Card title="login" style={{ width: 500, marginTop: "10rem", marginLeft: "auto", marginRight: "auto" }}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="名称">
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '请输入名称',
              },
            ],
            initialValue: username || "",
          })(<Input  />)}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码',
              },
            ],
            initialValue: password || "",
          })(<Input  type="password" />)}
        </Form.Item>
        <Form.Item {...formTailLayout}>
          <Button
            type="primary"
            htmlType="submit"
          >
            登录
          </Button>
        </Form.Item>
        </Form>
      </Card>
    )
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let res;
        try {
          res = await Request.axios('post', '/login', values);
          if(res) {
            localStorage.setItem("token", res.token);
            store.dispatch({type: "LOGIN_SUCCESSFULLY"});
            const _history = this.props.history;
            const _location = this.props.location;
            if(_location.state.from) {
              _history.push(_location.state.from.pathname)
            } else {
              _history.push("/");
            }
          } else {
            message.error(res.data)
          }
        } catch (error) {
          // message.error(error.message);
          console.log("err:", error);
        }
      }
    })
  }
}

export default Form.create()(Login);
