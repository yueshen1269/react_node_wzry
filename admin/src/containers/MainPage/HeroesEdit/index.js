
import React, { Component, Fragment } from "react"
import { Form, Input, Button, message, Upload, Icon, Select, Rate, Tabs } from "antd"
import Request from "../../../utils/request"

const {Option} = Select;
const { TabPane } = Tabs;

const desc = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
class HeroEdit extends Component {
  constructor(props) {
    super(props);
    this.state={
      loading: false,
      categories: [],
      evaluate: {},
    }
    this.token = null;
  }
  componentWillMount() {
    const storage = window.localStorage;
    this.token = JSON.parse(storage.getItem("token"));
  }
  componentDidMount() {
    this.fetchCategories();
    const _id = this.props.match.params.detail;
    const storage = window.localStorage;
    const last = JSON.parse(storage.getItem("last"));
    if(this.token === null || new Date() - new Date(last) > 3600000) {
      // this.fetchToken();
      this.token = JSON.parse(storage.getItem("token"));
      console.log("fetch new token:", this.token);
    }
    if(_id) {
      this.fetchHeroByID(_id);
    }
  }
  handleSubmit = (e,id) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let res;
        try {
          if(id) {
            res = await Request.axios('put', `/rest/heroes/${id}`, Object.assign({}, values, {avatar: this.state.imageUrl}));
          } else {
            res = await Request.axios('post', '/rest/heroes', Object.assign({}, values, {avatar: this.state.imageUrl}));
          }
          if(res) {
            this.props.history.push("/heroes/list")
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
    const {loading, imageUrl, name, alias, title, evaluate, heroId, isWeekFree, roles, categories} = this.state;
    const params = this.props.match.params;
    const option = {token: this.token};
    let id = params.detail;
    // if(JSON.stringify(params) !== "{}") {
    //   [id, icon, name] = params.detail.split("_");
    // }

    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

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
      <h1>{id ? "编辑英雄" : "新建英雄"}</h1>
      <Form {...formItemLayout} onSubmit={(e) => {this.handleSubmit(e, id)}}>
       <Tabs defaultActiveKey="basic">
        <TabPane tab="基本信息" key="basic">
          <Form.Item label="ID" hasFeedback>
            {getFieldDecorator('heroId', {
              rules: [
                {
                  required: true,
                  message: '请输入id',
                },
              ],
              initialValue: heroId || "",
            })(<Input  />)}
          </Form.Item>
          <Form.Item label="称号" hasFeedback>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入称号',
                },
              ],
              initialValue: name || "",
            })(<Input  />)}
          </Form.Item>
          <Form.Item label="英文名" hasFeedback>
            {getFieldDecorator('alias', {
              rules: [
                {
                  required: true,
                  message: '请输入英文名',
                },
              ],
              initialValue: alias || "",
            })(<Input  />)}
          </Form.Item>
          <Form.Item label="名称" hasFeedback>
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入名称',
                },
              ],
              initialValue: title || "",
            })(<Input  />)}
          </Form.Item>
          <Form.Item label="是否周免">
          {getFieldDecorator('isWeekFree', {
            rules: [
              {
                required: true,
              },
            ],
            initialValue: "0"
          })(
            <Select
              style={{ width: 200 }}
              optionFilterProp="children"
              // onChange={onChange}
              // onSearch={onSearch}
            >
              <Option
                key="1"
                value="1"
              >
                是
              </Option>
              <Option
                key="0"
                value="0"
              >
                否
              </Option>
            </Select>
          )
          }
          </Form.Item>
          <Form.Item label="图片">
              <Upload
                name="file"
                accept="image/*"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                data={option}
                // action="http://upload.qiniup.com"
                action="http://localhost:3001/admin/api/upload"
                // beforeUpload={beforeUpload}
                onChange={this.handleChange}
                // style={{width: "128px", height: "128px"}}
              >
                {imageUrl ? (<img src={imageUrl} alt="avatar" style={{ width: '100%' }} />) : uploadButton}
              </Upload>
          </Form.Item>
          <Form.Item label="角色">
            {getFieldDecorator('roles', {
              rules: [
                {
                  required: true,
                },
              ],
              initialValue: roles
            })(
              <Select
                mode="multiple"
                style={{ width: 200 }}
                optionFilterProp="children"
                // onChange={onChange}
                // onSearch={onSearch}
              >
                {categories.length>0 && categories.map(category => (
                  <Option
                    key={category._id}
                    value={category._id}
                  >
                    {category.category}
                  </Option>
                ))}
              </Select>
            )
            }
          </Form.Item>
          <Form.Item label="攻击">
            {getFieldDecorator('evaluate.attack', {
              rules: [
                {
                  required: true,
                },
              ],
              initialValue: Number(evaluate.attack)
            })(
              <Rate
                count={10}
                tooltips={desc}
              />
            )
            }
          </Form.Item>
          <Form.Item label="防守">
            {getFieldDecorator('evaluate.defence', {
              rules: [
                {
                  required: true,
                },
              ],
              initialValue: Number(evaluate.defence)
            })(
              <Rate
                count={10}
                tooltips={desc}
              />
            )
            }
          </Form.Item>
          <Form.Item label="难度">
            {getFieldDecorator('evaluate.difficulty', {
              rules: [
                {
                  required: true,
                },
              ],
              initialValue: Number(evaluate.difficulty)
            })(
              <Rate
                count={10}
                tooltips={desc}
              />
            )
            }
          </Form.Item>
          <Form.Item label="魔法">
            {getFieldDecorator('evaluate.magic', {
              rules: [
                {
                  required: true,
                },
              ],
              initialValue: Number(evaluate.magic)
            })(
              <Rate
                count={10}
                tooltips={desc}
              />
            )
            }
          </Form.Item>
          </TabPane>
        <TabPane tab="技能" key="spells">

        </TabPane>
      </Tabs>

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

  // fetchCategories = async () => {
  //   const items = await Request.axios('get', '/rest/items');
  //   console.log("items", items);
  //   this.setState({items})
  // }

  fetchToken = async id => {
    const res = await Request.axios("get", "获得七牛token的地址");
    const {data} = res;
    const storage = window.localStorage;
    storage.setItem("token", JSON.stringify(data));
    storage.setItem("last", JSON.stringify(new Date()))
  }

  fetchHeroByID = async id => {
    const res = await Request.axios("get", `/rest/heroes/${id}`);
    console.log("res,",res)
    const {name, avatar, title, alias, roles, isWeekFree, evaluate, heroId} = res;
    this.setState({
      name,
      title,
      alias,
      roles,
      isWeekFree,
      imageUrl: avatar,
      evaluate,
      heroId,
    })
  }

  fetchCategories = async () => {
    const categories = await Request.axios('get', '/rest/categories');
    this.setState({categories})
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // this.getBase64(info.file.originFileObj, imageUrl =>
      //   this.setState({
      //     imageUrl,
      //     loading: false,
      //   }),
      // );
      this.setState({
        imageUrl: info.file.response.url,
        // imageUrl: "图片地址前缀"+info.file.response.key,
        loading: false,
      })
    }
  };
}

export default Form.create()(HeroEdit);
