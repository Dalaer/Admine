import React, { Component } from 'react';
import {Table,Card,columns,Button,Popconfirm, message,Pagination} from 'antd'
import {storage} from '../../../common/js/local'
import './goods.less'
import Model from './model'

// storage();
class Goods extends Component {
    constructor(){
        super()
        this.columns=[
            {
                title:'id',
                dataIndex:'id',
                key:'id',
                fixed:'left',
                width:180
            },
            {
                title: 'Name',
                dataIndex: 'name',
                width:120,
                key: 'name'
            }, 
            {
                title: 'Age',
                dataIndex: 'age',
                width:100,
                key: 'age'
            }, 
            {
                title: 'Address',
                dataIndex: 'address',
                width:300,
                key: 'address'
            },
            {
                title:'Action',
                dataIndex:'',
                fixed:'right',
                width:300,
                key:'action',
                render:(data)=>{
                    return(
                        <div>
                            <Popconfirm title="Are you sure delete this text?" onConfirm={this.sure.bind(this,data.id)} okText="ok" cancelText="no">
                                <Button size="small" type="danger">DELETE</Button>&nbsp;
                            </Popconfirm>
                            <Button size="small" type="dashed" onClick={this.fixed.bind(this,data)}>FIX</Button>
                        </div>
                    )
                }
            }
        ]
        this.state={
            data:[],
            showModelFix:false,
            showModelAdd:false,
            currentData:{}
        }
    }
    // 点击删除确认时
    sure(id){
        // 删除页面的元素
        let txt = this.state.data.findIndex(v=>v.id===id);
        this.state.data.splice(txt,1);
        message.success("You've been deleted this text!",1);
        this.setState({})
    }
    // 点击添加按钮 --- 让模态框显示
    addData(){
        this.setState({
            showModelAdd:true
        })
    }
    // 点击修改按钮时
    fixed(data){
        // /将模态框展示出来
        this.setState({
            showModelFix:true,
            currentData:data
        })
    }
    // 将模态框消失
    visibal(){
        this.state.showModelAdd=false;
        this.state.showModelFix=false;
    }
    hide(txt){
        // 判断是否是取消操作了？
        if(!txt){
            this.visibal()
        }else{
            let newData=this.state.data;
            // 修理就找到那个值然后进行修改
            let index = newData.findIndex(v=>v.name===txt.name)
            // 若没有找到就unshift进去
            index<0 ? newData.unshift(txt) : newData[index]=txt;
            this.visibal();
            this.state.currentData=txt;
            this.state.data=newData
        }
        this.setState({})
    }
    // 请求数据的方法
    getData(page){
        this.$axios.get(`/getData/${page}`)
        .then((data)=>{
            this.setState({
                data:data.data
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    // 请求数据
    componentWillMount(){
        this.getData(1)
    }
    // 改变页码的时候
    changePage(page,pageSize){
        // console.log(page,pageSize)
        this.getData(page)
    }
    render() {
        // console.log(this.state.data)
        return (
            <Card className="Goods_center">
                {/* 添加 */}
                <Button onClick={this.addData.bind(this)}>Add</Button>
                {/* 将 Table 的分页器默认关掉 然后开启一个新的分页器 */}
                <Table 
                    rowKey='id'
                    columns={this.columns} dataSource={this.state.data} 
                    pagination={false}
                    scroll={{y:200,x:980}}
                />
                {/* 修理的模态框*/}
                {!this.state.showModelFix||<Model show={this.state.showModelFix}
                        hide={this.hide.bind(this)}
                        currentData={this.state.currentData}
                ></Model>}
                {/* 添加的模态框 */}
                {!this.state.showModelAdd||<Model show={this.state.showModelAdd}
                        hide={this.hide.bind(this)}
                >
                </Model>}
                {/* 重新定义的分页器 */}
                <Pagination simple total={12} className='panigation' defaultCurrent={1} pageSize={5} onChange={this.changePage.bind(this)}></Pagination>
            </Card>
        );
    }
}

export default Goods;
