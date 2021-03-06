import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './index.scss'
import { setAuthToken, setCurrentUser } from '../../utils/setAuth'

class AppHeader extends Component {
	constructor() {
		super();
		this.state = {
      chooseUrl: {
        management: 'http://118.126.108.36/image/files/choice_perfect_manager.msi', // 管理端路径
        control: '/choose/Control.jsp',
        register: '/choose/Register.jsp',
        login: '/choose/index.jsp',
        order: '/choose/OrderShow.jsp',
        waitSend: '/choose/WatishipmentsGoods.jsp'
      }
		}
	}
	// 退出
	loginOut() {
    var url = this.props.location.pathname
    if (/^\/member/.test(url) || /^\/order/.test(url) || /^\/payorder/.test(url)) {
      this.props.history.push('/')  // 跳转到主页
    }
		setAuthToken(false); // axios token 头清除，localStorage token清除
		setCurrentUser({}); // dispatch 当前空用户
	}
	render() {
		const auth = this.props.auth;
		const hello = (<ul className="ul-l">
						<li>哈，欢迎来到优选</li>
						<li>
							<Link to="/login">请登录</Link>
						</li>
						<li>
							<Link to="/register">免费注册</Link>
						</li>
					</ul>)
		const userinfo = (<ul className="ul-l">
						<li>Hi，<Link to="/member">{auth.user.nickname}</Link></li>
						<li>
							<a onClick={this.loginOut.bind(this)} href="javascript:void(0)">退出</a>
						</li>
					</ul>)
		return (
			<div className="app-header-wrap">
				<div className="app-header">
					{
						auth.isLogin ?
						userinfo :
						hello
					}
					<ul className="ul-r">
            <li><Link to="/">优选首页</Link></li>
						<li className="h-my">
              <Link to="/member">我的优选</Link>
              <div className="h-my-choi">
                <div><Link to="/member/safety">安全设置</Link></div>
                <div><Link to="/member">个人资料</Link></div>
                <div><Link to="/member/myorder">我的订单</Link></div>
                <div><Link to="/member/address">收货地址</Link></div>
              </div>
            </li>

            {
              !auth.isLogin || (auth.isLogin && auth.user.isSeller !== 1) ? (
                <li className="h-my">
                  <a href={this.state.login}>商家支持</a>
                    <div className="h-my-choi">
                      <div><a href={this.state.register}>注册商家</a></div>
                      <div><a href={this.state.management}>管理端下载</a></div>
                  </div>
                </li>) : (
                  <li className="h-my">
                      <a href={this.state.control}>卖家中心</a>
                      <div className="h-my-choi">
                        <div><a href={this.state.waitSend}>待发货宝贝</a></div>
                        <div><a href={this.state.order}>出售中宝贝</a></div>
                        <div><a href={this.state.management}>管理端下载</a></div>
                    </div>
                  </li>
                )
            }
            <li className="h-my">
                <a href="javascript:void(0);">联系客服</a>
                <div className="h-my-choi">
                  <div><a href={this.state.management}>管理端下载</a></div>
              </div>
            </li>
					</ul>
				</div>
			</div>
		)
	}
}

AppHeader.propTypes = {
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}
export default withRouter(connect(mapStateToProps, null)(AppHeader))
