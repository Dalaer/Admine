import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import {withRouter} from 'react-router-dom'
import root from './root.js'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

// console.log(root.root)
class Left extends Component {
    constructor(props){
        super(props);
        this.state={
            list:[]
        }
    }
    // 跳转函数  用this.props.history.push
    jump(path){
        this.props.history.push({
            pathname:path
        })
    }
    showLi(data){
        return data.map((item,index)=>{
            // 判断是否 是一级导航还是多级导航
            if(item.children){
                return (
                    <SubMenu key={item.id} title={<span>{item.name}</span>}>
                        {this.showLi(item.children)}
                    </SubMenu>
                )
            }else{
                return (
                    <Menu.Item key={item.id}
                        onClick={this.jump.bind(this,item.path)}
                    >
                        <span>
                            {item.name}
                        </span>
                    </Menu.Item>
                )
            }
        })
    }
    render() {
        return (
            <div>
                <Menu>
                    {this.showLi(root.root)}
                    {/* <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                        <MenuItemGroup title="Item 1">
                            <Menu.Item key="1">Option 1</Menu.Item>
                            <Menu.Item key="2">Option 2</Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="Iteom 2">
                            <Menu.Item key="3">Option 3</Menu.Item>
                            <Menu.Item key="4">Option 4</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu> */}
                </Menu>
            </div>
        );
    }
}
 
const NewLeft = withRouter(Left)
export default NewLeft;