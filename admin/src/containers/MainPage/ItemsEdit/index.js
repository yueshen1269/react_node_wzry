
import React, { Component, Fragment } from "react"
import { Form, Input, Button, message, Upload, Icon } from "antd"
import Request from "../../../utils/request"

// const {Option} = Select;

class ItemEdit extends Component {
  constructor(props) {
    super(props);
    this.state={
      loading: false,
    }
  }
  componentWillMount() {

  }
  componentDidMount() {
    // this.fetchCategories();
    const _id = this.props.match.params.detail;
    console.log("-d", _id);
    if(_id) {
      this.fetchItemByID(_id);
    }
    console.log("dd:", this.props.location, "ff:", this.props.history, "gg:", this.props.match);
  }
  handleSubmit = (e,id) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let res;
        try {
          if(id) {
            res = await Request.axios('put', `/rest/items/${id}`, Object.assign({}, values, {icon: this.state.imageUrl}));
          } else {
            res = await Request.axios('post', '/rest/items', Object.assign({}, values, {icon: this.state.imageUrl}));
          }
          if(res) {
            this.props.history.push("/items/list")
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
    const {loading, imageUrl, name} = this.state;
    const params = this.props.match.params;
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
      <h1>{id ? "编辑物品" : "新建物品"}</h1>
      <Form {...formItemLayout} onSubmit={(e) => {this.handleSubmit(e, id)}}>
      {/* <Form.Item label="父分类">
        {getFieldDecorator('parents', {


        })(
          <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a item"
          optionFilterProp="children"
          // onChange={onChange}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {items.length>0 && items.map(item => (
            <Option
              key={item._id}
              value={item._id}
            >
              {item.item}
            </Option>
          ))}

          </Select>
        )
        }
        </Form.Item> */}
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
        <Form.Item label="图片">
            <Upload
              name="file"
              accept="image/*"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="http://localhost:3001/admin/api/upload/"
              // beforeUpload={beforeUpload}
              onChange={this.handleChange}
              // style={{width: "128px", height: "128px"}}
            >
              {imageUrl ? (<img src={imageUrl} alt="avatar" style={{ width: '100%' }} />) : uploadButton}
            </Upload>
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

  // fetchCategories = async () => {
  //   const items = await Request.axios('get', '/rest/items');
  //   console.log("items", items);
  //   this.setState({items})
  // }
  fetchItemByID = async id => {
    const res = await Request.axios("get", `/rest/items/${id}`);
    console.log("res,",res)
    const {name, icon} = res;
    this.setState({
      name,
      imageUrl: icon,
    })
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
        loading: false,
      })
    }
  };
}

export default Form.create()(ItemEdit);
