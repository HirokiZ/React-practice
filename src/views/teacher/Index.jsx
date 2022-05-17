import React, { Component } from "react";
import {
  Card,
  Form,
  Input,
  Row,
  Col,
  Select,
  Button,
  Table,
  Pagination,
  message 
} from "antd";
import { getTeacherList,deletes,batchDelete } from "../../api/teacher";
import AddModal from "./AddModal";
import moment from 'moment'
const { Option } = Select;

export default class Index extends Component {
  state = {
    disabled: true,
    loading: false,
    data: [],
    formData:{},
    pageData: {
      page: 1,
      pageSize: 10,
    },
    total:0,
    visible: false, //控制子组件开关
    record:{},
    title:"",
    selectedRowKeys:[]
  };
  formRef = React.createRef();
  componentDidMount() {
    //第一次加载页面
    this.loadData();
  }
  //获取数据方法
  loadData = () => {
    // const formData = this.formRef.current.getFieldsValue(true);
    // const val = {
    //   ...formData,
    //   ...this.state.pageData,
    // };
    this.setState({
      loading: true,
    });
    const {pageData,formData}=this.state
    getTeacherList({...pageData,...formData}).then((res) => {
      this.setState({
        loading: false,
        data: res.data,
        total:res.total
      });
    });
  };
  //搜索
  search = () => {
    // console.log(this.formRef.current.getFieldsValue())  //获取所有值
    // this.formRef.current.validateFields().then(res=>{
    //   console.log(res)
    // })
    const formData = this.formRef.current.getFieldsValue(true);//当搜索的时候才更新formData
    this.setState({
      formData
    },function(){
      this.loadData();
    })
    
  };
  //重置
  reSet = () => {
    //
    this.formRef.current.resetFields();
    //重置分页数据
    this.setState({
      pageData: {
        page: 1,
        pageSize: 10,
      },
      formData:{}
    },function(){
      this.loadData();
    });
    
  };
  //新建员工
  showModal = () => {
    this.setState({
      visible: true,
      title:"新增教师"
    },function(){
      this.myRef.formRef.resetFields()
    });
    
  };
  //子组件接收传值
  changeVisible = (visible) => {
    this.setState({
      visible,
    });
  };
  //分页
  pageChange=(page, pageSize)=>{
    //注意这里修改分页数据是异步的，完成之后再去执行
    this.setState({
      pageData:{
        page,
        pageSize
      }
    },function(){
      this.loadData()
    })
  }
  //编辑
  edit=(record)=>{
    this.setState({
      record,
      visible:true,
      title:'编辑教师'
    },function(){
      this.myRef.formRef.setFieldsValue({  //状态更新的异步的，所以在function外面是拿不到ref的
        ...record,
        birth:moment(record.birth),
        date:moment(record.date),
      })
    })
  }
  //删除
  deletesss(id){
    deletes({id}).then((res)=>{
      if(res.code===0){ 
        message.success(res.msg);
        this.loadData()
      }
    
    })
  }
  //批量删除选中
  selectChange=(selectedRowKeys)=>{
    console.log(selectedRowKeys)
    this.setState({
      selectedRowKeys,
      disabled:selectedRowKeys.length?false:true
    })
  }
  //批量删除
  batchDelete=()=>{
    batchDelete({ids:this.state.selectedRowKeys}).then((res)=>{
      if(res.code===0){ 
        message.success(res.msg);
        this.loadData()
      }
    
    })
  }
  render() {
    //表头
    const columns = [
      {
        title: "序号",
        dataIndex: "index", //看接口文档,返回字段是什么，就是什么
        key: "index", //key不能重复
        align: "center",
        width: 60,
        render: (text, record, index) => index + 1, //生成复杂数据
      },
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        width: 80,
        align: "center",
      },
      {
        title: "性别",
        dataIndex: "gender",
        key: "gender",
        align: "center",
        width: 60,
        render: (text, record, index) => (text === 1 ? "男" : "女"),
      },
      {
        title: "级别",
        dataIndex: "level",
        key: "level",
        align: "center",
        width: 90,
        render: (text, record, index) => {
          if (text === 1) {
            return "初级教师";
          } else if (text === 2) {
            return "中级教师";
          } else if (text === 3) {
            return "高级教师";
          } else {
            return "特级教师";
          }
        },
      },
      {
        title: "年级",
        dataIndex: "grade",
        key: "grade",
        width: 80,
        align: "center",
      },
      {
        title: "科目",
        width: 60,
        dataIndex: "subject",
        key: "subject",
        align: "center",
      },
      {
        title: "入职日期",
        dataIndex: "date",
        key: "date",
        align: "center",
      },
      {
        title: "类型",
        dataIndex: "type",
        key: "type",
        align: "center",
        width: 70,
        render: (text, record, index) => (text === 1 ? "全职" : "兼职"),
      },
      {
        title: "手机号码",
        dataIndex: "tel",
        key: "tel",
        align: "center",
      },
      {
        title: "毕业院校",
        dataIndex: "school",
        key: "school",
        align: "center",
      },
      {
        title: "出生年月",
        dataIndex: "birth",
        key: "birth",
        align: "center",
      },
      {
        title: "家庭住址",
        dataIndex: "address",
        key: "address",
        align: "center",
      },
      {
        title: "学历",
        dataIndex: "education",
        key: "education",
        align: "center",
      },
      {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        fixed: "right",
        align: "center",
        render: (text, record, index) => {
          return (
            <div>
              <Button type="primary" size="small" onClick={()=>this.edit(record)}>
                编辑
              </Button>
              <Button type="danger" size="small" onClick={()=>this.deletesss(record.id)}>
                删除
              </Button>
            </div>
          );
        },
      },
    ];
    const { disabled, loading, visible,total,record,title,selectedRowKeys } = this.state; //这里统一结构状态里的值，直接在下面使用
    return (
      <div>
        <Card>
          {/* Form搜索框 */}
          <Form
            ref={this.formRef}
            name="basic"
            labelCol={{ span: 6 }} // 文字长度
            wrapperCol={{ span: 18 }} //INPUT框长度
          >
            <Row gutter={16}>
              <Col span={6}>
                {/* name属性最好和后台一致 */}
                <Form.Item label="姓名" name="name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="科目" name="subject">
                  <Select>
                    <Option value="">全部</Option>
                    <Option value="语文">语文</Option>
                    <Option value="数学">数学</Option>
                    <Option value="英语">英语</Option>
                    <Option value="物理">物理</Option>
                    <Option value="化学">化学</Option>
                    <Option value="生物">生物</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="手机号" name="tel">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Button onClick={this.reSet}>重置</Button>
                <Button type="primary" className="ml" onClick={this.search}>
                  搜索
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
        {/* 操作按钮部分 */}
        <Card className="mt">
          <Button type="primary" onClick={this.showModal}>
            新建员工
          </Button>
          <Button danger disabled={disabled} className="ml" onClick={this.batchDelete}>
            批量删除
          </Button>
        </Card>
        {/* table部分 */}
        <Card className="mt">
          <Table
            columns={columns}
            dataSource={this.state.data}
            scroll={{ x: 1400 }}
            rowKey={(record) => record.id} //rowKey,接收一个函数，参数为record(数据行)
            loading={loading}
            pagination={false}
            rowSelection={{
              type: 'cheackbox',
              selectedRowKeys:selectedRowKeys,
              onChange:this.selectChange
            }}
          />
          
          <Pagination
            size='small'
            total={total}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
            style={{marginTop:'15px'}}
            onChange={this.pageChange}
          />
        </Card>

        {/* 弹窗 */}
        <AddModal
          visible={visible}
          changeVisible={this.changeVisible}
          reload={this.loadData} // 子组件要调用刷新列表方法，我从父组件传过去
          record={record}
          ref={a=>this.myRef=a}
          title={title}
        />
      </div>
    );
  }
}
