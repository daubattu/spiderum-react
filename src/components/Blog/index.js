import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from '../Main/Sidebar/Sidebar.js';
import { Link } from 'react-router-dom';
import Comments from './Comments.js';
import Author from '../Main/Author.js';

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        comments: []
      }
    }
  }
  componentWillMount() {
    axios.get(`http://localhost:8080/api/posts/${this.props.match.params.identify}`)
      .then(res => {
        const post = res.data;
        this.setState({post});
      });
    console.log('componentWillUnmount');
  }
  render() {
    return(
        <div id="post">
          <div className="container post-content">
            <ol className="breadcrumb">
              <li><Link to="/">Home</Link></li>
              { this.state.post.category && <li><a href="#">{this.state.post.category}</a></li>}
              <li className="active">{this.state.post.title}</li>
            </ol>
            <div dangerouslySetInnerHTML={{__html: this.state.post.content}}></div>
          </div>
          <Comments post={this.state.post} />
        </div>
    )
  }
}
export default Blog;
