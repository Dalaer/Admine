import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './Home.less'
import Left from  './components/left/Left'
import Center from './components/right_center/Center'

class Home extends Component {
    render() {
        return (
            <div className="home">
                <Row>
                    <Col span={4}>
                        <div className='left'>
                            <Left />
                        </div>
                    </Col>
                    <Col span={20}>
                        <div className='right'>
                            <Row>
                                <Col span={24}>
                                    Top
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Center></Center>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    Bottom
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Home;