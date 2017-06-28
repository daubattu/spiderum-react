import React, { Component } from 'react';
import Post from './Post.js';
import axios from 'axios';

class Recommend extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    }
  }
  componentWillMount() {
    axios.get('http://localhost:8080/api/posts/filter/random')
      .then(res => {
        this.setState({posts: res.data});
      })
  }
  render() {
    return(
      <div className="sidebar_recommned">
        <p id="title">Có thể bạn thích?</p>
        {
          this.state.posts.map((post, index) => {
            return <Post post={post} key={index} />
          })
        }
      </div>
    )
  }
}
export default Recommend;
