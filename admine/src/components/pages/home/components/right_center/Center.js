import React, { Component } from 'react';

class Center extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                这里是 --- {this.props.name}
            </div>
        );
    }
}

export default Center;