import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Select, Card, Input, Button, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import { getSubjectList } from '../../redux'

import { reqGetSubjectList, reqAddSubjectList } from '@api/edu/subject'

import './index.less'

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
@connect(
    state => ({
        subjectlist: state.subjectlist
    }), { getSubjectList }
)
class AddSubject extends Component {
    state = {
        subjectlist: {
            total: 0,
            items: []
        }
    }
    page = 1
    async componentDidMount() {
        // console.log(this.props);

        // this.props.getSubjectList(1, 10)
        const res = await reqGetSubjectList(this.page++, 10)
        this.setState({
            subjectlist: res
        })
    }
    handleloadMore = async () => {
        const res = await reqGetSubjectList(this.page++, 10)
        const newItems = [...this.state.subjectlist.items, ...res.items]

        this.setState({
            subjectList: {
                total: res.total,
                items: newItems
            }
        })
    }
    onFinish = async values => {
        try {
            await reqAddSubjectList(values.subjectname, values.parentid)
            message.success('课程分类添加成功')
            this.props.history.push('/edu/subject/list')
        } catch{
            message.error('课程分类添加失败')
        }
    }
    render() {
        return (
            <Card
                title={
                    <>
                        <Link to='/edu/subject/list'>
                            <ArrowLeftOutlined />
                        </Link>
                        <span className='add-subject'>新增课程</span>
                    </>
                }
            >
                <Form
                    {...layout}
                    name='subject'
                    onFinish={this.onFinish}
                // onFinishFailed={onFinishFailed}
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
                        <Select
                            dropdownRender={menu => {
                                return (
                                    <>
                                        {menu}
                                        {this.state.subjectList.total > this.state.subjectList.items.length && (
                                            <Button type='link' onClick={this.handleloadMore}>
                                                加载更多数据
                                            </Button>

                                        )}
                                    </>
                                )
                            }}
                        >

                            <Option value={0} key={0}>
                                {'一级菜单'}
                            </Option>
                            {this.props.subjectlist.items.map(subject => {
                                return (
                                    <Option value={subject._id} key={subject._id}>{subject.title}</Option>
                                )
                            })}
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
export default AddSubject