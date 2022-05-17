import React, { Component } from "react";
import style from "./index.module.css";
import { Button, Card, Tabs, Form, Input,} from "antd";
import {connect} from "react-redux"
import {loginAction,menuAction} from "../../redux/actions/login"
import {login} from '../../api/index'
import { asyncRouterMap } from "../../common/routerMap";
import { filterMenu } from "../../utils/menuFilter";
const { TabPane } = Tabs;
class Index extends Component {
  login=()=>{
    const {loginAction,menuAction,history}=this.props
    this.formRef.validateFields().then((res)=>{
      //表单校验通过
      //打印出来的就是要传的参数
      console.log("得到输入的账号密码",res)  
      login(res).then((res)=>{
        //存储token
        sessionStorage.setItem('token',res.token)
        //存储用户权限，昵称
        loginAction({
          role:res.role,
          nickname:res.nickname
        })
        //筛选出每个角色所对应的菜单项,并存入redux
        menuAction(filterMenu(asyncRouterMap,res.role))
        console.log(filterMenu(asyncRouterMap,res.role))
        // menuAction([1,2,3])
        //跳转
        history.push("/index/home")
      }).catch((err)=>{
        //这里是请求的catch
        console.log("请求接口失败走这里",err)
      })
    }).catch((err)=>{
      //表单校验不通过，走这里，拿到错误
      console.log('表单不通过走这里',err)
    })
  }
  render() {
    console.log("打印login组件路由", this.props);
    return (
      <div className={style.wrap}>
        <h1>{this.props.res.loginReducer.nickname}</h1>
        <Card
          size="small"
          title="好学教育统一管理系统"
          style={{ width: 500 }}
          headStyle={{ textAlign: "center",fontSize:"18px",fontWeight:"700" }}
          bordered={false}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="手机号密码登录" key="1">
              <Form
                name="basic"
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}   
                ref={(a)=>{this.formRef=a}}
              >
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: "账号不能为空" },
                    {pattern:/^\w{4,8}$/,message:"账号要求是4-8位数字字母组合"}
                  ]}
                >
                  <Input placeholder='请输入您的账号'/>
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "密码不能为空" },
                  ]}
                >
                  <Input.Password placeholder='请输入您的密码'/>
                </Form.Item>

                <Button 
                  type="primary" 
                  className={style.btn}
                  onClick={this.login}
                  >
                   立即登录
                  </Button>
              </Form>
            </TabPane>
            <TabPane tab="新用户注册" key="2"></TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}
export default connect(
  state=>({
    res:state
  }),
  {
    loginAction,
    menuAction
  }
)(Index)