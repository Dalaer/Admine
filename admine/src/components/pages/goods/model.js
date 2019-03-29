import React, { Component } from 'react';
import {Modal,Form,Input,Button} from 'antd'

class model extends Component {
    componentDidMount(){
        const {setFieldsValue} = this.props.form;
        // 判断是修改还是添加
        if(this.props.currentData){
            let {name,age,address} = this.props.currentData
            setFieldsValue({name,age,address})
        }
    }
    // ok----拿到修改后的值
    handel(){
        let data = this.props.form.getFieldsValue(['name','age','address']);
        data.id=this.props.currentData ? this.props.currentData.id : Date.now()
        this.props.hide(data)
    }
    // cancel---不修改了
    cancelFix(){
        console.log('xxxxxxxxxxxxxxxx')
        this.props.hide()
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Modal
                    title="Basic Modal"
                    visible={this.props.show}
                    onOk={this.handel.bind(this)}
                    onCancel={this.cancelFix.bind(this)}
                >
                    <Form layout="vertical">
                        <Form.Item label="Name">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input the name of collection!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="Age">
                            {getFieldDecorator('age', {
                                rules: [{ required: true, message: 'Please input the age of collection!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="Address">
                            {getFieldDecorator('address')(<Input type="textarea" />)}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const newModel = Form.create({ name: 'form_in_modal' })(model)
export default newModel;