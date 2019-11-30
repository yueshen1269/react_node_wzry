
import React, { Component, Fragment } from "react"
import { Form, Input, Button, message, Upload, Icon } from "antd"
import Request from "../../../utils/request"

// const {Option} = Select;

class AdminUserEdit extends Component {
  constructor(props) {
    super(props);
    this.state={
      loading: false,
    }
    this.token = null;
  }
  componentWillMount() {
    const storage = window.localStorage;
    this.token = JSON.parse(storage.getItem("token"));
  }
  componentDidMount() {
    // this.fetchCategories();
    const _id = this.props.match.params.detail;
    const storage = window.localStorage;
    const last = JSON.parse(storage.getItem("last"));
    if(this.token === null || new Date() - new Date(last) > 3600000) {
      // this.fetchToken();
      this.token = JSON.parse(storage.getItem("token"));
      console.log("fetch new token:", this.token);
    }
    if(_id) {
      this.fetchAdminUserByID(_id);
    }
  }
  handleSubmit = (e,id) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let res;
        try {
          if(id) {
            res = await Request.axios('put', `/rest/admin_users/${id}`, values);
          } else {
            res = await Request.axios('post', '/rest/admin_users', values);
          }
          if(res) {
            this.props.history.push("/admin_users/list")
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
    const {password, name} = this.state;
    const params = this.props.match.params;
    const option = {token: this.token};
    let id = params.detail;
    // if(JSON.stringify(params) !== "{}") {
    //   [id, icon, name] = params.detail.split("_");
    // }

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
    return (
    <>
      <h1>{id ? "编辑管理员" : "新建管理员"}</h1>
      <Form {...formItemLayout} onSubmit={(e) => {this.handleSubmit(e, id)}}>
        <Form.Item label="账号" hasFeedback>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入名称',
              },
            ],
            initialValue: name || "",
          })(<Input  />)}
        </Form.Item>
        <Form.Item label="密码" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码',
              },
            ],
            initialValue: password || "",
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

  fetchToken = async id => {
    const res = await Request.axios("get", "获得七牛token的地址");
    const {data} = res;
    const storage = window.localStorage;
    storage.setItem("token", JSON.stringify(data));
    storage.setItem("last", JSON.stringify(new Date()))
  }

  fetchAdminUserByID = async id => {
    const res = await Request.axios("get", `/rest/admin_users/${id}`);
    console.log("res,",res)
    const {name, password} = res;
    this.setState({
      name,
      password,
    })
  }

}

export default Form.create()(AdminUserEdit);
