import React, { Component } from 'react';
import Post from './Post.js';
import data from '../../data.json';

class TopPost extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { posts } = data;
    const post = posts[0];
    return(
      <div className="toppost">
        <p id="title">Bài viết của tháng</p>
        <Post post={post} />
        <Post post={post} />
        <Post post={post} />
        <Post post={post} />
      </div>
    )
  }
}
export default TopPost;
