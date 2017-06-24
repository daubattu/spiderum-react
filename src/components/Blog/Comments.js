import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import Comment from './Comment';
import Footer from '../Footer.js';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentPost: {
        comment: ''
      },
      id: '',
      post: this.props.post,
      comments: [],
      messages: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.postComment = this.postComment.bind(this);
  }
  handleChange(e) {
    let { commentPost } = this.state;
    commentPost[e.target["name"]] = e.target.value;
    this.setState({commentPost});
    console.log('render');
  }
  fadeOutMessages() {
    setTimeout(() => {
      console.log('fadeOutMessages');
      this.setState({messages: ''});
    }, 5000);
  }
  postComment() {
      if(!_.isEmpty(this.state.commentPost.comment)) {
        let commentPost = {}
        commentPost.comment = '';
        axios.post(`http://localhost:8080/api/posts/${this.props.post._id}/comments`, this.state.commentPost)
          .then(res => {
            let messages = 'Success';
            this.setState({commentPost, messages});
            axios.get(`http://localhost:8080/api/posts/${this.props.post._id}/comments`)
              .then(res => {
                this.setState({comments: res.data});
              });
          }).catch(err => {
              if(err.response.data.errors.login) {
                this.setState({commentPost, messages: err.response.data.errors.login});
              } else if(err.response.data.errors.deprecated) {
                this.setState({commentPost, messages: err.response.data.errors.deprecated});
              }
            });
      } else {
        let messages = 'You need typing some text to do this action';
        this.setState({messages});
      }
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    this.setState({comments: nextProps.post.comments});
  }

  render() {
    console.log(this.props.post);
    let time = new Date(this.props.post.date);
    console.log(time);
    return(
      <div className="container">
        <div id="comments">
          <h1>Comments</h1>
          <div className="form-group">
            <ul className="list-group">
              {
                this.state.comments.map((cmt, index) => {
                  return(
                    <Comment cmt={cmt} stt={index} key={index} />
                  )
                })
              }
            </ul>
            <label htmlFor="commentPost">Comment: { this.state.messages && <b style={{color: 'red'}}>{this.state.messages}</b>}</label>
            <textarea value={this.state.commentPost.comment} onChange={this.handleChange} className="form-control" rows="2" name="comment"></textarea>
            { this.state.messages ? this.fadeOutMessages() : null}
          </div>
          <button onClick={this.postComment} className="btn btn-primary">Comment</button>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Comments;
