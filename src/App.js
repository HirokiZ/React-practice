import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
//BrowserRouter 相当于vue中的history模式router
import Home from "./views/Layout/Index"
import Login from "./views/Login/Index"
import { authLogin } from './utils/auth'
export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact render={(props) => { return <Redirect to='/index/home'></Redirect> }}></Route>
            <Route path="/index" render={(props) => {
              //如果没有登录，到登录页，如果登陆了到主页
              if (!authLogin()) {
                return <Redirect to="/login"></Redirect>
                // return <Login {...props}/>
              }
              return <Home {...props} />
            }}></Route>

            <Route path="/login" render={(props) => {
              //登陆了，不能去login页面
              if (authLogin()) {
                return <Redirect to="/index/home"></Redirect>
              }
              return <Login {...props} />
            }}></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
