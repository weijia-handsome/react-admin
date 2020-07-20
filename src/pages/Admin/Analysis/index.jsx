import React, { Component } from 'react'
// import ReactDOM from 'react-dom';
// 导入antd中栅格布局的组件
// Row 表示一行
// Col 表示一列
import { Row, Col, Statistic, Progress } from 'antd'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'

// 导入项目中自己封装的Card组件
import Card from '@comps/Card'

import { AreaChart, ColumnChart } from 'bizcharts';

const firstRowCol = {
  // xs, md, lg 表示不同的屏幕尺寸 具体见antd文档
  // span表示col在行中占的格数
  // 一行共24个格
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 }
}
// 数据源
const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 7 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 4 },
  { year: '1998', value: 6 },
  { year: '1999', value: 13 },
];
// 数据源
const columnData = [
  {
    type: '家具家电',
    sales: 38,
  },
  {
    type: '粮油副食',
    sales: 52,
  },
  {
    type: '生鲜水果',
    sales: 61,
  },
  {
    type: '美容洗护',
    sales: 145,
  },
  {
    type: '母婴用品',
    sales: 48,
  },
  {
    type: '进口食品',
    sales: 38,
  },
  {
    type: '食品饮料',
    sales: 38,
  },
  {
    type: '家庭清洁',
    sales: 38,
  },
];
// const loading = loading

export default class Analysis extends Component {
  state = {
    loading: false
  }
  componentDidMount() {
    //请求之前,改成展示
    this.setState({
      loading: true
    })

    setTimeout(() => {
      //表示数据拿到了
      this.setState({
        loading: false
      })
    }, 2000)
  }

  render() {
    return (
      <div>
        {/* gutter 表示栅格之间的间隔
          第一个参数: 水平方向  单位是px
          第二个参数: 垂直方向  单位是px
        
        */}
        <Row gutter={[16, 16]}>
          <Col {...firstRowCol}>
            <Card
              // Card标题
              title={
                <Statistic title='总销售额' value={112893} prefix={'￥'} />
              }
              footer={<span>日销售额 ￥12,423</span>}
            >
              {/* card的内容,写在子节点的位置 */}
              <span>
                周同比 12% <CaretUpOutlined style={{ color: 'red' }} />
              </span>
              <span style={{ marginLeft: 10 }}>
                日同比 10% <CaretDownOutlined style={{ color: 'pink' }} />
              </span>
            </Card>
          </Col>
          <Col {...firstRowCol}>
            <Card
              // Card标题
              title={
                <Statistic title='总销售额' value={112893} prefix={'￥'} />
              }
              footer={<span>日销售额 ￥12,423</span>}
            >
              <AreaChart
                data={data}
                // title={{
                //   visible: true,
                //   text: '面积图',
                // }}
                xField='year'
                yField='value'
                smooth={true}
                forseFit={true}
                xAxis={{
                  // 表示水平方向坐标是否展示
                  visible: false
                }}
                yAxis={{
                  // 表示垂直方向坐标是否展示
                  visible: false
                }}
                color='red'
                padding='0'
              />
  );
            </Card>
          </Col>
          <Col {...firstRowCol}>
            <Card
              // Card标题
              title={
                <Statistic title='支付笔数' value={3333} />
              }
              footer={<span>转化率 60%</span>}>
              <ColumnChart
                data={columnData}
                // title={{
                //   visible: true,
                //   text: '基础柱状图',
                // }}
                forceFit
                padding='0'
                xField='type'
                yField='sales'
                meta={{
                  type: {
                    alias: '类别',
                  },
                  sales: {
                    alias: '销售额(万)',
                  },
                }}
                xAxis={{
                  visible: false
                }}
                yAxis={{
                  visible: false
                }}
              />
            </Card>
          </Col>
          <Col {...firstRowCol}>
            <Card
              // Card标题
              title={
                <Statistic title='运营结果' value={44444} />
              }
              footer={<span>转化率 80.9%</span>}
              loading={this.state.loading}//表示展示骨架组件
            >
              <Progress
                //进度条颜色
                // 对象表示渐变色
                // 写一个颜色值的字符串表示单一颜色
                strokeColor={{
                  from: '#108ee9',
                  to: '#87d068'
                }}
                // 进度
                percent={80.9}
                // 闪烁效果
                status='active'
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
