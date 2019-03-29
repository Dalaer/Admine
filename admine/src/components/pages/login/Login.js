import React, { Component } from 'react';
import {
    Form, Icon, Input, Button, Checkbox,message,Card
  } from 'antd';
import './Login.less'

class Login extends Component {
    submit(e){
        // validateFields-----》校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
        this.props.form.validateFields((err,value)=>{
            if(!err){
                // 出现提示框 然后转到home页
                message.loading('1秒后跳转',1,()=>{
                    this.$axios.get('/login')
                    .then((data)=>{
                        console.log(data)
                        this.props.history.push('/home/home')
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                })
            }else{
                return false;
            }
        })
    }
    render() {
        // 与form进行双向绑定 ---- > 拿到dom元素
        const { getFieldDecorator } = this.props.form;
        return (
            <Card className="form" title='LOGIN'size="small" style={{ width: 300 }}>
                <Form className="login-form">
                    <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.submit.bind(this)}>
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

const NewLogin =Form.create({ name: 'normal_login' })(Login);
export default NewLogin;