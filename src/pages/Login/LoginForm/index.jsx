import React, { Component, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, Tabs,} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { reqGetVerifyCode } from '@api/acl/oauth'
import { login, reqGetLogin } from "@redux/actions/login";

import "./index.less";

const { TabPane } = Tabs;

function LoginForm(props) {
  const [form] = Form.useForm()

  const [isShowDownCount, setIsShowDownCount] = useState(false)
  let [downCount, setDownCount] = useState(5)
  const [activeKey, setActiveKey] = useState('user')
  //这个是登录按钮
  const onFinish = () => {
    //1.判断当前这个登录按钮,是用户名登录还是手机登录
    if (activeKey === 'user') {
      //校验用户名和密码
      form.validateFields(['username', 'password']).then(res => {
        let { username, password } = res
        props.login(username, password).then((token) => {
          // 登录成功
          // console.log("登陆成功~");
          // 持久存储token
          localStorage.setItem("user_token", token);
          props.history.replace("/");
        });
      })
    } else {
      //校验手机号和验证码
      form.validateFields(['mobile', 'verify']).then(res => {
        let { mobile, verify } = res
        props.reqGetLogin(mobile, verify).then(token => {
          // 登录成功
          // console.log("登陆成功~");
          // 持久存储token
          localStorage.setItem("user_token", token);
          props.history.replace("/");
        });
      })
    }
    // .catch(error => {
    //   notification.error({
    //     message: "登录失败",
    //     description: error
    //   });
    // });
  };
  //antd中第二种校验方式
  const validator = (rule, value) => {
    return new Promise((resolve, reject) => {
      if (!value) {
        return reject('请输入密码')
      }
      if (value.length < 4) {
        return reject('密码不能少于四个字符')
      }
      if (value.length > 16) {
        return reject('密码不能超过十六个字符')
      }
      if (!/^[0-9a-zA-Z_]+$/.test(value)) {
        return reject('密码只能输入数字,字母,下划线')
      }
      resolve()
    })
  }
  //获取验证码事件处理函数
  const getVerifyCode = async () => {
    console.log('jj');
    const res = await form.validateFields(['phone'])
    //如果验证不成功,后面就不会执行,成功了后面代码就可以执行
    console.log(res);
    const jj= await reqGetVerifyCode(res.phone)
    console.log(jj);

    //3.当请求发出去之后,按钮应该展示倒计时,并且倒计时的过程中,按钮不能点击
    //点击获取验证码之后,让按钮禁用,然后展示倒计时
    setIsShowDownCount(true)
    let timeId = setInterval(() => {

      //修改倒计时的时间
      downCount--
      setDownCount(downCount)
      if (downCount <= 0) {
        //清楚定时器
        clearInterval(timeId)
        //取消按钮禁用
        setIsShowDownCount(false)
        //恢复倒计时时间
        setDownCount(5)
      }
    }, 1000);
  }
  //tab切换触发的事件处理函数
  const handleTabChange = activeKey => {
    setActiveKey(activeKey)
  }
  //git第三方授权登录点击事件
  const gitOauthLogin = () => {
    window.location.href =
      'https://github.com/login/oauth/authorize?client_id=fbeb41ce3f9acc6198a1'
  }
  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        //将form实例和Form组件结合起来
        form={form}
      >
        <Tabs
          defaultActiveKey="user"
          tabBarStyle={{ display: "flex", justifyContent: "center" }}
          //切换页签的时候触发、
          onChange={handleTabChange}
        >
          <TabPane tab="账户密码登陆" key="user">
            <Form.Item name="username"
              rules={[
                {
                  required: true,
                  message: '请输入您的用户名'
                },
                {
                  min: 4,
                  message: '用户名不能少于四个字'
                },
                {
                  max: 16,
                  message: '用户名不能超过十六个字'
                },
                {
                  pattern: /^[0-9a-zA-Z_]+$/,
                  message: '用户名只能为数字字母下划线'
                }

              ]}
            >
              <Input
                prefix={<UserOutlined className="form-icon" />}
                placeholder="用户名: admin"
              />
            </Form.Item>
            <Form.Item name="password"
              rules={[{ validator }]}
            >
              <Input
                prefix={<LockOutlined className="form-icon" />}
                type="password"
                placeholder="密码: 111111"
              />
            </Form.Item>
          </TabPane>
          <TabPane tab="手机号登陆" key="phone">
            <Form.Item name="phone"
              rules={[
                {
                  required: true,
                  message: '请输入您的手机号码'
                },
                {
                  pattern: /^1[3456789]\d{9}$/,
                  message: '请输入正确的手机号码'
                }
              ]}
            >
              <Input
                prefix={<MobileOutlined className="form-icon" />}
                placeholder="手机号"
              />
            </Form.Item>

            <Row justify="space-between">
              <Col span={16}>
                <Form.Item name="verify">
                  <Input
                    prefix={<MailOutlined className="form-icon" />}
                    placeholder="验证码"
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Button 
                className="verify-btn" 
                onClick={getVerifyCode}
                disabled={isShowDownCount}
            >{isShowDownCount ? `${downCount}秒后获取` : '获取验证码'}</Button>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Row justify="space-between">
          <Col span={7}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>自动登陆</Checkbox>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Button type="link">忘记密码</Button>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            // htmlType="submit"
            className="login-form-button"
            onClick={onFinish}
          >
            登陆
            </Button>
        </Form.Item>
        <Form.Item>
          <Row justify="space-between">
            <Col span={16}>
              <span>
                其他登陆方式
                  <GithubOutlined className="login-icon" onClick={gitOauthLogin}/>
                <WechatOutlined className="login-icon" />
                <QqOutlined className="login-icon" />
              </span>
            </Col>
            <Col span={3}>
              <Button type="link">注册</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
}
//withRouter 高阶组件函数
export default withRouter(
  connect(
    null,
    { login, reqGetLogin }
  )(LoginForm)
);
