
import React, { Component, Fragment } from "react"
import { Form, Input, Button, message, Upload, Icon, Select } from "antd"
import ReactQuill from 'react-quill';
import Request from "../../../utils/request"

import 'react-quill/dist/quill.snow.css';
import './index.css'

const {Option} = Select;


const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote', 'align',
  'list', 'bullet', 'indent',
  'link', 'image'
];

function imageHandler() {
  console.log("this:",this);
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();
  input.onchange = async () => {
    const file = input.files[0];
    const fd = new FormData();
    fd.append('file', file);
    const hide = message.loading('上传中...', 0);
    const res = await Request.axios("post", "/upload", fd);
    if (res) {
      const range = this.quill.getSelection();
      this.quill.insertEmbed(range.index, 'image', res.url);
      hide();
    }
    ;
  };
}

class ArticleEdit extends Component {
  constructor(props) {
    super(props);
    this.state={
      loading: false,
      items: [],
      body: "",
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
      this.fetchArticleByID(_id);
    }
    console.log("dd:", this.props.location, "ff:", this.props.history, "gg:", this.props.match);
  }

  modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', {align: []}],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image () {
          imageHandler.call(this)
        }
      },
      imageDrop: true,
  }}



  handleSubmit = (e,id) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let res;
        try {
          if(id) {
            res = await Request.axios('put', `/rest/articles/${id}`, Object.assign({}, values, {body: this.state.body}));
          } else {
            res = await Request.axios('post', '/rest/articles', Object.assign({}, values, {body: this.state.body}));
          }
          if(res) {
            this.props.history.push("/articles/list")
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
    const {loading, text, title, items, categories, body} = this.state;
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
      <h1>{id ? "编辑文章" : "新建文章"}</h1>
      <Form {...formItemLayout} onSubmit={(e) => {this.handleSubmit(e, id)}}>
      <Form.Item label="分类">
        {getFieldDecorator('categories', {
          initialValue: categories
        })(
          <Select
            showSearch
            style={{ width: 200 }}
            mode="multiple"
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
                {item.category}
              </Option>
            ))}

          </Select>
        )
        }
        </Form.Item>
        <Form.Item label="标题" hasFeedback>
          {getFieldDecorator('title', {
            rules: [
              {
                required: true,
                message: '请输入标题',
              },
            ],
            initialValue: title || "",
          })(<Input  />)}
        </Form.Item>
        <Form.Item label="正文" wrapperCol={{span: 16}}>
          {/* {getFieldDecorator('body', {
              rules: [
                {
                  required: true,
                },
              ],
              initialValue: body || "",
            })( */}
            <ReactQuill
              value={body}
              onChange={this.handleChange}
              modules={this.modules}
              theme='snow'
              formats={formats}
            />
            {/* )} */}

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

  fetchCategories = async () => {
    const items = await Request.axios('get', '/rest/categories');
    console.log("items", items);
    this.setState({items})
  }

  fetchToken = async id => {
    const res = await Request.axios("get", "获得七牛token的地址");
    const {data} = res;
    const storage = window.localStorage;
    storage.setItem("token", JSON.stringify(data));
    storage.setItem("last", JSON.stringify(new Date()))
  }

  fetchArticleByID = async id => {
    const res = await Request.axios("get", `/rest/articles/${id}`);
    console.log("res,",res);
    const {title, body, categories} = res;
    this.setState({
      categories,
      title,
      body,
    })
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = value => {
    this.setState({body: value})
  }

}

export default Form.create()(ArticleEdit);
