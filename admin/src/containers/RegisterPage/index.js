import React, { Component } from "react"
import { Layout, Menu, Breadcrumb, Icon, Switch } from 'antd';
import { Link } from "react-router-dom"
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


export default class Register extends Component {
  render() {
    return (

    <Layout style={{height: "100vh"}}>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                内容管理
              </span>
            }
          >
            <Menu.ItemGroup key="g1" title="分类">
              <Menu.Item key="1">
                <Link to="/register/createclass">新建分类</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/register/classlist">分类列表</Link>
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >

        </Content>
      </Layout>
    </Layout>
    )
  }
}
