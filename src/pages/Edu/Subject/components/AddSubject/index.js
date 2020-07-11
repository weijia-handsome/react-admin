import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Form, Select, Card, Input, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

//表单布局属性
const layout = {
    // antd把一个宽度分为24份
    // 表单文字描述部分
    labelCol: {
        span: 3
    },
    // 表单项部分
    wrapperCol: {
        span: 6
    }
}
// 点击添加按钮,表单校验成功之后的回调函数
const onFinish = values => {
    console.log('Success:', values)
}
// 表单校验失败的回调函数
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
}

// 获取Option组件
const Option = Select.Option
export default class index extends Component {
    render() {
        return (
            <Card
                title={
                    <>
                        <Link to='/edu/subject/list'>
                            <ArrowLeftOutlined />
                        </Link>
                        <span className='title'>新增课程</span>
                    </>
                }
            >
                <Form
                    {...layout}
                    name='subject'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label='课程分类名称'
                        name='subjectname'
                        rules={[
                            {
                                required: true,
                                message: '请输入课程分类!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='父级分类id'
                        name='parentid'
                        rules={[
                            {
                                required: true,
                                message: '请选择分类id'
                            }
                        ]}
                    >
                        <Select>
                            <Option value={1}>
                                {'一级菜单'}
                            </Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            Submit
                </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
