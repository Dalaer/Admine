import React,{Component} from 'react'
import {Route,Switch,Redirect,BrowserRouter} from 'react-router-dom'
import Home from './home/Home'
import Login from './login/Login'
import App from '../../App'
import Goods from './goods/Goods'
import Pie1 from './pie/pie1'
import Pie2 from './pie/pie2'
import Line1 from './line/line1'
import Line2 from './line/line2'

class FirstPage extends Component{
    render(){
        return(
            <div>
                <App>
                    <BrowserRouter>
                        <Switch>
                            <Route path='/home' render={()=>{
                                return(
                                    <Home>
                                        <Switch>
                                            <Route path='/home/goods' render={()=>{
                                                return(<Goods></Goods>)
                                            }}></Route>
                                            <Route path='/home/echart/bin/bin1' render={()=>{
                                                return (<Pie1></Pie1>)
                                            }} ></Route>
                                            <Route path='/home/echart/bin/bin2' render={()=>{
                                                return (<Pie2></Pie2>)
                                            }} ></Route>
                                            <Route path='/home/echart/line/line1' render={()=>{
                                                return (<Line1></Line1>)
                                            }} ></Route>
                                            <Route path='/home/echart/line/line2' render={()=>{
                                                return (<Line2></Line2>)
                                            }} ></Route>
                                        </Switch>
                                    </Home>
                                )
                            }}/>
                            <Route path='/login' component={Login}/>
                            <Redirect exact from='/' to='/home'/>
                        </Switch>
                    </BrowserRouter>
                </App>
            </div>
        )
    }
}

export default FirstPage