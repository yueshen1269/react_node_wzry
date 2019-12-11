
import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Form, Input, Button, message, Select } from "antd"

const {Option} = Select;

function CategoryEdit(props) {
  useEffect(() => {
    const {fetchCategoryByID, fetchCategories, match:{params:{detail:id}}} = props;
    fetchCategories();
    if(id) {
      fetchCategoryByID(id);
    }
  }, []);

  function handleSubmit(e, id) {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        props.addAndUpdateCategory(values, id);
      }
    });
  };

  const { getFieldDecorator } = props.form;
  const categoryState = props.categoryState;
  const {item, items} = categoryState;
  const {parents, category, } = item;
  console.log("dd:", props.location, "ff:", props.history, "gg:", props.match);
  const id = props.match.params.detail;
  const formItemLayout = {
    labelCol: {
      xs: { span: 4},
      sm: { span: 2 },
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
    <h1>{id ? "编辑分类" : "新建分类"}</h1>
    <Form {...formItemLayout} onSubmit={(e) => {handleSubmit(e, id)}}>
    <Form.Item label="父分类">
      {getFieldDecorator('parents', {
        initialValue: parents && parents._id || "",
      })(
        <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a category"
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
      <Form.Item label="名称" hasFeedback>
        {getFieldDecorator('category', {
          rules: [
            {
              required: true,
              message: '请输入名称',
            },
          ],
          initialValue: category || "",

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

export default Form.create()(CategoryEdit);

CategoryEdit.propTypes = {
  fetchCategoryByID: PropTypes.func,
  fetchCategories: PropTypes.func,
  addAndUpdateCategory: PropTypes.func,
  categoryState: PropTypes.object,
}

CategoryEdit.defaultProps = {
  fetchCategoryByID() {},
  fetchCategories() {},
  addAndUpdateCategory() {},
  categoryState: {},
}
