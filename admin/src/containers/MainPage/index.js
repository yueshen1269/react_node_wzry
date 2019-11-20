import React, { Component } from "react"
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link, Route, Switch } from "react-router-dom"
import CreateClass from "./CategoriesEdit"
import ClassList from "./ClassList"
const { SubMenu } = Menu;
const { Content, Sider } = Layout;


export default class Main extends Component {

  render() {
    const currentKey = [this.props.history.location.pathname] || ["/categories/create"];
    return (

    <Layout style={{height: "100vh"}}>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['create']}
          defaultOpenKeys={['sub1']}
          selectedKeys={currentKey}
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
              <Menu.Item key="/categories/create" >
                <Link to="/categories/create"
                // style={{color: this.props.history.location.pathname === '/categories/create' ? '#1890ff' : 'rgba(0, 0, 0, 0.65)'}}
                >新建分类</Link>
              </Menu.Item>
              <Menu.Item key="/categories/list">
                <Link to="/categories/list"
                // style={{color: this.props.history.location.pathname === '/categories/list' ? '#1890ff' : 'rgba(0, 0, 0, 0.65)'}}
                >分类列表</Link>
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
          <Switch>
            <Route path="/categories/create" component={CreateClass}></Route>
            <Route path="/categories/list" component={ClassList}></Route>
            <Route path="/categories/edit/:detail" component={CreateClass}></Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
    )
  }
}
