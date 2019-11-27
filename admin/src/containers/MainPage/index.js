import React, { Component } from "react"
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link, Route, Switch } from "react-router-dom"

import CreateClass from "./CategoriesEdit"
import ClassList from "./ClassList"
import ItemEdit from "./ItemsEdit"
import ItemsList from "./ItemsList"
import HeroEdit from "./HeroesEdit"
import HeroesList from "./HeroesList"
import ArticleEdit from "./ArticleEdit/index.js"
import ArticlesList from "./ArticleList/index.js"

const { SubMenu } = Menu;
const { Content, Sider } = Layout;


export default class Main extends Component {

  render() {
    let currentKey = [this.props.history.location.pathname] || ["/categories/create"];
    if(currentKey[0].startsWith("/categories/edit")) {
      currentKey[0] = "categories/create";
    } else if (currentKey[0].startsWith("/items/edit")) {
      currentKey[0] = "/items/create";
    } else if (currentKey[0].startsWith("/heroes/edit")) {
      currentKey[0] = "/heroes/create";
    } else if (currentKey[0].startsWith("/articles/edit")) {
      currentKey[0] = "/articles/create";
    }
    console.log("currentKey", currentKey)
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
            <Menu.ItemGroup key="category" title="分类">
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
            <Menu.ItemGroup key="item" title="物品">
              <Menu.Item key="/items/create" >
                <Link to="/items/create"
                // style={{color: this.props.history.location.pathname === '/items/create' ? '#1890ff' : 'rgba(0, 0, 0, 0.65)'}}
                >新建物品</Link>
              </Menu.Item>
              <Menu.Item key="/items/list">
                <Link to="/items/list"
                // style={{color: this.props.history.location.pathname === '/items/list' ? '#1890ff' : 'rgba(0, 0, 0, 0.65)'}}
                >物品列表</Link>
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="hero" title="英雄">
              <Menu.Item key="/heroes/create" >
                <Link to="/heroes/create"
                // style={{color: this.props.history.location.pathname === '/heroes/create' ? '#1890ff' : 'rgba(0, 0, 0, 0.65)'}}
                >新建英雄</Link>
              </Menu.Item>
              <Menu.Item key="/heroes/list">
                <Link to="/heroes/list"
                // style={{color: this.props.history.location.pathname === '/heroes/list' ? '#1890ff' : 'rgba(0, 0, 0, 0.65)'}}
                >英雄列表</Link>
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="article" title="文章">
              <Menu.Item key="/articles/create" >
                <Link to="/articles/create"
                // style={{color: this.props.history.location.pathname === '/articles/create' ? '#1890ff' : 'rgba(0, 0, 0, 0.65)'}}
                >新建文章</Link>
              </Menu.Item>
              <Menu.Item key="/articles/list">
                <Link to="/articles/list"
                // style={{color: this.props.history.location.pathname === '/articles/list' ? '#1890ff' : 'rgba(0, 0, 0, 0.65)'}}
                >文章列表</Link>
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
            <Route path="/items/create" component={ItemEdit}></Route>
            <Route path="/items/list" component={ItemsList}></Route>
            <Route path="/items/edit/:detail" component={ItemEdit}></Route>
            <Route path="/heroes/create" component={HeroEdit}></Route>
            <Route path="/heroes/list" component={HeroesList}></Route>
            <Route path="/heroes/edit/:detail" component={HeroEdit}></Route>
            <Route path="/articles/create" component={ArticleEdit}></Route>
            <Route path="/articles/list" component={ArticlesList}></Route>
            <Route path="/articles/edit/:detail" component={ArticleEdit}></Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
    )
  }
}
