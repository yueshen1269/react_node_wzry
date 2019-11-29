
import React, { Component, Fragment } from "react"
import { Form, Input, Button, message, Upload, Icon, Row, Col, Popconfirm, Divider } from "antd"
import Request from "../../../utils/request"


class AdEdit extends Component {
  constructor(props) {
    super(props);
    this.state={
      loading: false,
      items: [],
    }
    this.token = null;
  }
  componentWillMount() {
    const storage = window.localStorage;
    this.token = JSON.parse(storage.getItem("token"));
  }
  componentDidMount() {
    const _id = this.props.match.params.detail;
    const storage = window.localStorage;
    const last = JSON.parse(storage.getItem("last"));
    if(this.token === null || new Date() - new Date(last) > 3600000) {
      // this.fetchToken();
      this.token = JSON.parse(storage.getItem("token"));
      console.log("fetch new token:", this.token);
    }
    if(_id) {
      this.fetchAdByID(_id);
    }
  }
  handleSubmit = (e,id) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      const {items} = this.state;
      console.log("this.values:",values.items, items);
      values.items.map((item, index) => {
        item["image"] = items[index]["image"];
      })
      if (!err) {
        let res;
        try {
          if(id) {
            res = await Request.axios('put', `/rest/ads/${id}`, Object.assign({}, values, {}));
          } else {
            res = await Request.axios('post', '/rest/ads', Object.assign({}, values, {image: this.state.items.image}));
          }
          if(res) {
            this.props.history.push("/ads/list")
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
    console.log("this.state", this.state);
    const { getFieldDecorator } = this.props.form;
    const {loading, items, name} = this.state;
    const params = this.props.match.params;
    const option = {token: this.token};
    let id = params.detail;
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
      <h1>{id ? "编辑广告" : "新建广告"}</h1>
      <Form {...formItemLayout} onSubmit={(e) => {this.handleSubmit(e, id)}}>
        <Form.Item label="名称" hasFeedback>
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
        <Form.Item label="广告" wrapperCol={{span: 16}}>
        <Row>
          <Button
            type="primary"
            onClick={this.handleAddItem}
          >
            <Icon type="plus" />新增广告
          </Button>
          <Divider />
            {
              items.map((item, index) => {
                return (
                <Col key={item.name || index} span={10} offset={2}>
                  <Form.Item label="url">
                    {getFieldDecorator(`items[${index}].url`, {
                      rules: [
                        {
                          required: true,
                        },
                      ],
                      initialValue: item.url || ""
                    })(
                      <Input />
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
                      onChange={(info) => this.handleChange(info, index)}
                    >
                      {item.image ? (<img src={item.image} alt="icon" style={{ width: '100%' }} />) : uploadButton}
                    </Upload>
                  </Form.Item>
                  <Popconfirm title="Sure to delete?" onConfirm={()=>{items.splice(index, 1); this.setState({items})}}>
                    <Button type="danger">删除</Button>
                  </Popconfirm>
                </Col>
                )
              })
            }
            </Row>
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

  fetchAdByID = async id => {
    const res = await Request.axios("get", `/rest/ads/${id}`);
    console.log("res,",res)
    const {name, items} = res;
    this.setState({
      name,
      items,
    })
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = (info, index) => {
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
      const {items} = this.state;
      items[index]["image"] = info.file.response.url;
      this.setState({
        items,
        // imageUrl: "图片地址前缀"+info.file.response.key,
        loading: false,
      })
    }
  }

  handleAddItem = () => {
    const {items} = this.state;
    items.push({});
    this.setState({
      items,
    })
  }
}

export default Form.create()(AdEdit);
