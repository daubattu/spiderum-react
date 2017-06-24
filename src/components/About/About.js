import React, { Component } from 'react';
import Main from './Main.js';
import Sidebar from './Sidebar.js';
import Footer from './Footer.js';

import './assets/plugins/bootstrap/css/bootstrap.min.css';
import './assets/css/styles.css';
import './assets/plugins/font-awesome/css/font-awesome.css';

class About extends Component {
  render() {
    return(
      <div id="cv">
        <div className="container wrapper">
          <Main />
          <Sidebar />
        </div>
        <Footer />
      </div>
    )
  }
}
export default About;
