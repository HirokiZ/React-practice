import React, { Component } from "react";
import moment from 'moment'
import {addTeacher,editTeacher} from '../../api/teacher'
import { Modal, Form, Input, Col, Row, Select, DatePicker, Radio,message } from "antd";
const { Option } = Select;

export default class AddModal extends Component {
  componentDidUpdate(){
    //在子组件更新的时候，this.props可以拿到子组件传回来的值
    // console.log(this.props)
  }
  handleOk = () => {
    console.log(this.formRef)
    this.formRef.validateFields().then((res)=>{
      //res就是表单收集到的数据
      const {id}=this.props.record
      const birth=moment(res.birth).format('YYYY-MM-DD');
      const date=moment(res.date).format('YYYY-MM-DD');
      const fn=this.props.title==='新增教师'?addTeacher({...res,birth,date}):editTeacher({...res,birth,date,id})
      
      //调用接口birth,date，覆盖res里面的birth,date
      fn.then(data=>{
        if(data.code===0){
          
          this.props.changeVisible(false)//关闭弹窗
          this.formRef.resetFields() //清空弹框列表
          this.props.reload()//更新列表
          message.success(data.msg);
        }
      })
    }).catch(err=>{
      console.log('捕获错误',err)
    })
  };
  handleCancel = () => {
    this.props.changeVisible(false)
  };
  onChange = () => {
    console.log(1)
  };
  render() {
    //显示开关的属性肯定需要从父组件传过来
    const {visible,title}=this.props
    return (
      <div>
        <Modal
          title={title}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width='800px'
        >
          <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} ref={(a) => (this.formRef = a)}>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="姓名"
                  name="name" //参考后台接口
                  rules={[{ required: true, message: "姓名不能为空" }]}
                >
                  <Input></Input>
                </Form.Item>
                <Form.Item
                  label="性别"
                  name="gender" //参考后台接口
                  rules={[{ required: true, message: "性别不能为空" }]}
                >
                  <Select>
                    <Option value={1}>男</Option>
                    <Option value={2}>女</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="级别"
                  name="level" //参考后台接口
                  rules={[{ required: true, message: "级别不能为空" }]}
                >
                  <Select>
                    <Option value={1}>初级教师</Option>
                    <Option value={2}>中级教师</Option>
                    <Option value={3}>高级教师</Option>
                    <Option value={4}>特级教师</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="年级"
                  name="grade" //参考后台接口
                  rules={[{ required: true, message: "年级不能为空" }]}
                >
                  <Input></Input>
                </Form.Item>
                <Form.Item
                  label="科目"
                  name="subject" //参考后台接口
                  rules={[{ required: true, message: "科目不能为空" }]}
                >
                  <Input></Input>
                </Form.Item>
                <Form.Item
                  label="入职日期"
                  name="date" //参考后台接口
                  rules={[{ required: true, message: "日期不能为空" }]}
                >
                  <DatePicker onChange={this.onChange} style={{width:"100%"}}/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="类型"
                  name="type" //参考后台接口
                  rules={[{ required: true, message: "类型不能为空" }]}
                >
                  <Radio.Group >
                    <Radio value="1">全职</Radio>
                    <Radio value="2">兼职</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="手机号码"
                  name="tel" //参考后台接口
                  rules={[{ required: true, message: "手机号码不能为空" }]}
                >
                  <Input></Input>
                </Form.Item>
                <Form.Item
                  label="毕业院校"
                  name="school" //参考后台接口
                  rules={[{ required: true, message: "毕业院校不能为空" }]}
                >
                  <Input></Input>
                </Form.Item>
                <Form.Item
                  label="出生年月"
                  name="birth" //参考后台接口
                  rules={[{ required: true, message: "出生不能为空" }]}
                >
                  <DatePicker onChange={this.onChange} style={{width:"100%"}}/>
                </Form.Item>
                <Form.Item
                  label="家庭住址"
                  name="address" //参考后台接口
                  rules={[{ required: true, message: "地址不能为空" }]}
                >
                  <Input></Input>
                </Form.Item>
                <Form.Item
                  label="学历"
                  name="education" //参考后台接口
                  rules={[{ required: true, message: "学历不能为空" }]}
                >
                  <Input></Input>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
