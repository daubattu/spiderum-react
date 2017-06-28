import React, { Component } from 'react';
import './App.css';
import Wellcome from './components/Wellcome.js';
import Panel from './components/Main/Panel.js';

class App extends Component {
  render() {
    return (
      <main>
        <Wellcome />
        <Panel />
      </main>
    );
  }
}

export default App;
