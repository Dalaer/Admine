import React,{Component} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Home from './home/Home'
import Login from './login/Login'

class FirstPage extends Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route path='/home' component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Redirect exact from='/' to='/home'/>
                </Switch>
            </div>
        )
    }
}

export default FirstPage