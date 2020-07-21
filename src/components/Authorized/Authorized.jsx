import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserInfo, getMenuInfo } from './redux'
import Loading from '@comps/Loading'

@connect(
  null,
  { getUserInfo, getMenuInfo }
)
class Authorized extends Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    let { getUserInfo, getMenuInfo } = this.props

    await Promise.all([getUserInfo(), getMenuInfo()])
    //数据一定存储到了redux中
    this.setState({
      loading: false
    })
    // this.props.getUserInfo()
    // this.props.getMenuInfo()
  }
  render() {
    let { loading } = this.state
    return (
      loading ? <Loading></Loading> : this.props.render()
    )
  }
}
export default Authorized