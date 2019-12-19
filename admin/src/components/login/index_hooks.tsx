import React, { useEffect, forwardRef, useImperativeHandle, ReactElement } from "react";
import { Card, Form, Button, Input } from "antd";
import { FormComponentProps } from "antd/es/form";

interface LoginProps extends FormComponentProps {
  history: any;
  location: any;
  match: any;
  login: (params: { username: string; password: string; from?: string | null }) => void;
}
type Ref = FormComponentProps;
const Login = forwardRef<Ref, LoginProps>(({ form, location, login }: LoginProps, ref) => {
  // useImperativeHandle(ref, () => ({
  //   form,
  // }));
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        const _state = location.state;
        let from = null;
        if (_state) from = _state.from;
        login(Object.assign({}, values, { from }));
      }
    });
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 5 },
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
    <Card
      title="login"
      style={{
        width: 500,
        marginTop: "10rem",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="名称">
          {form.getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "请输入名称",
              },
            ],
            initialValue: "",
          })(<Input />)}
        </Form.Item>
        <Form.Item label="密码">
          {form.getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "请输入密码",
              },
            ],
            initialValue: "",
          })(<Input type="password" />)}
        </Form.Item>
        <Form.Item {...formTailLayout}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
});
function Login1(props) {
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      props.history.push("/");
    }
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        const _state = props.location.state;
        let from = null;
        if (_state) from = _state.from;
        props.login(Object.assign({}, values, { from }));
      }
    });
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 5 },
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
  const { getFieldDecorator } = props.form;
  return (
    <Card
      title="login"
      style={{
        width: 500,
        marginTop: "10rem",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="名称">
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "请输入名称",
              },
            ],
            initialValue: "",
          })(<Input />)}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "请输入密码",
              },
            ],
            initialValue: "",
          })(<Input type="password" />)}
        </Form.Item>
        <Form.Item {...formTailLayout}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Form.create<LoginProps>()(Login);
