import React, { Component } from "react";
import { Card, Tabs, Row, Col,Timeline } from "antd";
import style from "./style.module.css";
import * as echarts from "echarts";
// import axios from "axios";
const { TabPane } = Tabs;
export default class index extends Component {
  state = {
    xData: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    yData: [5, 50, 36, 10, 10, 20, 90, 128, 133, 60, 70, 94],
    xDatas: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    yDatas: [5, 50, 36, 10, 10, 20, 90, 128, 133, 60, 70, 94],
    list:[
      {
        content:"王志鹏结算了一门课程",
        time:"操作时间 2021-09-09",
        color:'red'
      },
      {
        content:"王志鹏结算了一门课程",
        time:"操作时间 2021-09-09",
        color:'green'
      },
      {
        content:"王志鹏结算了一门课程",
        time:"操作时间 2021-09-09",
        color:'yellow'
      },
      {
        content:"王志鹏结算了一门课程",
        time:"操作时间 2021-09-09",
        color:'orange'
      },
  
     
    ]
  };
  componentDidMount() {
    this.drawBar();
    this.drawPie()
    // this.drawLine();
    // axios().then((res)=>{
    //   this.setState({
    //     list:res.list
    //   })
    // })
  }
  drawBar = () => {
    const myChart = echarts.init(this.myRef);
    myChart.setOption({
      title: {
        text: "2020年上半年进件统计数据",
      },
      tooltip: {},

      xAxis: {
        data: this.state.xData,
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: this.state.yData,
        },
      ],
    });
  };

  drawLine = () => {
    const myCharts = echarts.init(this.myRefs);
    myCharts.setOption({
      title: {
        text: "2020年上半年进件统计数据",
      },
      tooltip: {},

      xAxis: {
        data: this.state.xDatas,
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "line",
          smooth: true,
          data: this.state.yDatas,
        },
      ],
    });
  };

  drawPie = () => {
    const myCharts = echarts.init(this.myRef2);
    myCharts.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: '语文' },
            { value: 735, name: '数学' },
            { value: 580, name: '英语' },
            { value: 484, name: '物理' },
            { value: 310, name: '化学' },
            { value: 120, name: '生物' }
          ]
        }
      ]
    });
  };
  callback=(defaultActiveKey)=>{
    console.log(defaultActiveKey)
    if(defaultActiveKey===2){
     
      setTimeout(()=>{
        this.drawLine()
      },0)
    }
  }
  render() {
    return (
      <div>
        <Card>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="销售额" key="1">
              <Row>
                <Col span={16}>
                  <div
                    className={style.panel}
                    ref={(a) => (this.myRef = a)}
                  ></div>
                </Col>
                <Col span={8}></Col>
              </Row>
            </TabPane>
            <TabPane tab="访问量" key="2" forceRender={true}>
            <Row>
                <Col span={16}>
                  <div
                    className={style.panel}
                    ref={(a) => (this.myRefs = a)}
                  ></div>
                </Col>
                <Col span={8}></Col>
              </Row>
            </TabPane>
          </Tabs>
        </Card>
        <Row className='mt' gutter="10">
          <Col span={12}>
            <Card title='操作动态'>
            <Timeline className={style.panel}>
              
               {
                 this.state.list.map((item,index)=>{
                   return (
                     <Timeline.Item color={item.color} key={index}>
                       <p className={style.mb}>{item.content}</p>
                       <p className={style.mb}>
                          {item.time}
                       </p>
                     </Timeline.Item>
                   )
                 })
               }
              
            </Timeline>
            </Card>
          </Col>
          <Col span={12}>
          <Card title='销售类别占比'>
               <div className={style.panel}
                    ref={(a) => (this.myRef2 = a)}>

               </div>
               </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
