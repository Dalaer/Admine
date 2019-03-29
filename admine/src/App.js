import React, { Component } from 'react';
// import Route from './components/pages/Route'
import {HashRouter} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <HashRouter>
          <FirstRoute></FirstRoute>
        </HashRouter> */}
        {this.props.children}
      </div>
    );
  }
}

export default App;
