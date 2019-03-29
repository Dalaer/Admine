import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './Home.less'
import Left from  './components/left/Left'

class Home extends Component {
    render() {
        return (
            <Row className="home">
                <Col span={4} className='left'>
                    <Left />
                </Col>
                <Col span={20} className="right">
                    <div className='top'>
                        Top
                    </div>
                    <div className="center">
                        {this.props.children}
                    </div>
                    <div className='bottom'>
                        Bottom
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Home;