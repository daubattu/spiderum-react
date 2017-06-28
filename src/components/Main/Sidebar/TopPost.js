import React, { Component } from 'react';
import axios from 'axios';
import time from '../../../utils/time.js';
import Post from './Post.js';

class TopPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }
  componentWillMount() {
    axios.get('http://localhost:8080/api/posts/topMonth')
      .then(res => {
        this.setState({posts: res.data});
      })
  }
  render() {
    console.log(this.state.posts);
    return(
      <div className="toppost">
        <p id="title">Bài viết của tháng</p>
        {
          this.state.posts.map((post, index) => {
            return <Post key={index} post={post} />
          })
        }
      </div>
    )
  }
}
export default TopPost;
