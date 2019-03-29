import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './common/style/index.less';
import Route from './components/pages/Route';
import * as serviceWorker from './serviceWorker';
import Axios from './axios/axios'

Component.prototype.$axios=Axios

ReactDOM.render(<Route />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
