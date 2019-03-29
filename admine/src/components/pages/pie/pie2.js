import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
 

class pie1 extends Component {
    constructor(){
        super();
        this.state={
            data:{
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
                        ]
                    }
                ]
            }
        }
    }
    componentDidMount(){
        const ws = new WebSocket('ws://localhost:8081');
        ws.onopen=()=>{
            ws.send(JSON.stringify({type:'echart2'}))
            ws.onmessage=(msg)=>{
                let newMsg = JSON.parse(msg.data);
                let newdata=JSON.parse(JSON.stringify(this.state.data));
                newdata.series[0].data=newMsg
                this.setState({
                    data:newdata
                })
            }
        }
    }
    render() {
        return (
            <div>
                <ReactEcharts
                    option={this.state.data}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"theme_name"}
                    onChartReady={this.onChartReadyCallback}
                     />
            </div>
        );
    }
}

export default pie1;