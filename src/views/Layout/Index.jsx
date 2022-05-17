import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import { getInfo } from "../../api/index";
import { filterMenu } from "../../utils/menuFilter";
import { asyncRouterMap } from "../../common/routerMap";
import { loginAction, menuAction } from "../../redux/actions/login";
import { Route, NavLink } from "react-router-dom";
import Headers from '@/components/headers/index'
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
class Index extends Component {
  //初始数据
  state = {
    menuTree: [],
  };
  //闭包定义一个初始化数组
  renderRoute = (menu) => {
    let routerList = [];
    //创建异步路由
    const asyncRoute = (data) => {
      //初始值不放在函数里面的原因，是因为我需要找到routerList里面的children不重复运算
      data.forEach((item) => {
        if (item.children) {
          asyncRoute(item.children);
        } else {
          //没有children，我就循环把每个文件给引进来
          routerList.push(
            <Route
              path={`/index`+`${item.path}`}
              component={lazy(() => import(`@/views${item.path}/Index.jsx`))}
              key={item.path}
            ></Route>
          );
        }
      });
    };
    asyncRoute(menu);
    console.log(routerList);
    return routerList;
  };

  //生命周期
  componentDidMount() {
    //判断用户是否刷新
    //打印一下redux里的数据，还有没有
    console.log(this.props);
    if (this.props.res.menuReducer.length) {
      //首次架子啊
      const menuTree = this.renderMenu(this.props.res.menuReducer);
      this.setState({
        menuTree,
      });
    } else {
      //刷新了
      getInfo().then((res) => {
        const { loginAction, menuAction } = this.props;
        //重新设置用户名和权限
        loginAction({ role: res.data.role, nickname: res.data.nickname });
        //存储菜单数据
        //不能直接存，少了一步权限的过滤，通过
        menuAction(filterMenu(asyncRouterMap, res.data.role));
        const menuTree = this.renderMenu(this.props.res.menuReducer);
        this.setState({
          menuTree,
        });
      });
    }
  }
  //渲染nav函数
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.meta.title} key={item.path} >
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.path}>
          <NavLink to={`/index`+`${item.path}`}>{item.meta.title}</NavLink>
        </Menu.Item>
      );
    });
  };

  render() {
    console.log("打印Home组件路由", this.props);
    const { menuReducer } = this.props.res;
    return (
      <Layout style={{ height: "100vh" }}>
        <Sider style={{ background: "#001529",height:'100vh' }}>
          <h1 style={{textAlign:'center',color:"#fff",lineHeight:'50px',marginTop:'15px'}}>好学教育</h1>
          <Menu theme='dark'>{this.state.menuTree}</Menu>
        </Sider>
        <Layout style={{background:"#f4f4f4",height:'100vh',overflow:'auto'}}>
          <Header style={{color:"#fff",background:"#fff",textAlign:"right"}}>
            <Headers history={this.props.history}/>
          </Header>
          <Suspense fallback={<div>loading...</div>}>
            <Content style={{padding:'20px'}}>{this.renderRoute(menuReducer)}</Content>
          </Suspense>
        </Layout>
      </Layout>
    );
  }
}
export default connect(
  (state) => ({
    res: state,
  }),
  {
    loginAction,
    menuAction,
  }
)(Index);
