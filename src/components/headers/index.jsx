import React, { Component } from "react";
import { Menu, Dropdown } from "antd";
import { connect } from "react-redux";
import { DownOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { loginAction,menuAction } from "../../redux/actions/login";


class Index extends Component {
    logOut=()=>{
      console.log(this.props)
        sessionStorage.clear();
        //主动清空redux
        this.props.loginAction({role:"",nickname:""})
        this.props.menuAction([]);
        //非路由组件在这里没办法跳,在父组件把history传入
        this.props.history.push('/login')
    }
  render() {
    console.log(this.props);
    const menu = (
      <Menu>
        <Menu.Item icon={<UserOutlined />} key='a'>
          <NavLink to='/index/personal'>个人中心</NavLink>
        </Menu.Item>
        <Menu.Item icon={<HomeOutlined />} onClick={this.logOut} key='b'>退出登录</Menu.Item>
      </Menu>
    );
    const { nickname } = this.props.res.loginReducer;
    return (
      <div>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            欢迎回来,{nickname}
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
    );
  }
}

export default connect((state) => ({
  res: state,
}),{
    loginAction,
    menuAction
})(Index);
