import React, { Component } from 'react';
import Post from './Post.js';

class Recommend extends Component {
  render() {
    return(
      <div className="sidebar_recommned">
        <p id="title">Phù hợp với bạn</p>
        <Post />
        <Post />
        <Post />
      </div>
    )
  }
}
export default Recommend;
