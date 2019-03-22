import React, { Component } from 'react';
import FirstRoute from './components/pages/FirstPage'
import {HashRouter} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <FirstRoute></FirstRoute>
        </HashRouter>
      </div>
    );
  }
}

export default App;
