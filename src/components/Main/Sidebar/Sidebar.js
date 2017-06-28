import React, { Component } from 'react';
import TopPost from './TopPost.js';
import Recommend from './Recommend.js';

class Sidebar extends Component {
  render() {
    return(
      <div className="sidebar hidden-sm hidden-xs col-lg-3 col-md-3">
        <TopPost />
        <Recommend />
      </div>
    )
  }
}

export default Sidebar;
