import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import Comment from './Comment';
import Footer from '../Footer.js';
import { Link } from 'react-router-dom';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentPost: {
        comment: ''
      },
      id: '',
      isEdit: false,
      post: this.props.post,
      comments: [],
      messages: '',
      editCmt: '',
      cmtEdited: '',
      id_cmt_edit: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.postComment = this.postComment.bind(this);
    this.handleChangeCmtEdit = this.handleChangeCmtEdit.bind(this);
  }
  handleChange(e) {
    let { commentPost } = this.state;
    commentPost[e.target["name"]] = e.target.value;
    this.setState({commentPost});
  }
  fadeOutMessages() {
    setTimeout(() => {
      this.setState({messages: ''});
    }, 5000);
  }
  postComment() {
      if(!_.isEmpty(this.state.commentPost.comment)) {
        let commentPost = {}
        commentPost.comment = '';
        axios.post(`http://localhost:8080/api/posts/${this.props.id}/comments`, this.state.commentPost)
          .then(res => {
            let messages = 'Success';
            this.setState({commentPost, messages});
            axios.get(`http://localhost:8080/api/posts/${this.props.id}/comments`)
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
    console.log('componentWillReceiveProps()');
    axios.get(`http://localhost:8080/api/posts/${nextProps.id}/comments`)
      .then(res => {
        this.setState({comments: res.data, id: nextProps._id});
      })
  }
  setAuthorComment(cmt) {
    if(localStorage.username) {
      const username = localStorage.username;
      if(username === cmt.username || localStorage.username === 'admin') return true;
    }
    else return false;
  }
  handleEdit(cmt_id, cmt) {
    console.log('cmt_iddddddddddddddddddddddd', cmt_id);
    this.setState({isEdit: true, id_cmt_edit: cmt_id, editCmt: cmt, isEdit: !this.state.isEdit});
  }
  handleRemove(post_id, cmt_id) {
    axios.delete(`http://localhost:8080/api/posts/${post_id}/comments/${cmt_id}`)
      .then(res => {
        axios.get(`http://localhost:8080/api/posts/${post_id}/comments`)
          .then(cmt => {
            this.setState({comments: cmt.data});
          })
      });
  }
  handleClick(post_id, cmt_id) {
    let deprecated = false;
    for(let cmt of this.state.comments) {
      if(cmt.comment === this.state.editCmt) deprecated = true;
    }
    if(deprecated) this.setState({messages: 'Your cmt is exist!!!'});
    else {
      axios.put(`http://localhost:8080/api/posts/${post_id}/comments`, { comment_id: cmt_id, comment_content: this.state.editCmt})
        .then(res => {
          axios.get(`http://localhost:8080/api/posts/${post_id}/comments`)
            .then(cmt => this.setState({isEdit: false, comments: res.data}));
        }).catch(err => this.setState({messages: err.response.data.messages}))
    }
  }
  handleChangeCmtEdit(e) {
    this.setState({editCmt: e.target.value});
  }
  render() {
    let comments = this.state.comments;
    let id = this.props.id;
    return(
      <div className="comments-post" style={{padding: '0'}}>
        <div className="container" id="comments">
          <h1>Comments</h1>
          <div className="form-group">
            <ul className="list-group">
              {
                comments.map((cmt, index) => {
                  return(
                    <li key={index} className="list-group-item">
                      <div style={{display: 'flex'}}>
                        <div>
                          {index + 1}: {cmt.username}:
                          {
                            this.state.isEdit && ( cmt.username === localStorage.username || localStorage.username === 'admin' ) && cmt._id === this.state.id_cmt_edit
                            ? <div id="content_comment" style={{display: 'inline-block'}}>
                                <input type="text" id="editCmt" onChange={this.handleChangeCmtEdit} value={this.state.editCmt} />
                                <button id="btn-editCmt" onClick={() => this.handleClick(id, cmt._id)} className="btn btn-xs btn-primary">Update</button>
                              </div>
                            : <span id="content_comment">{
                                this.state.id_cmt_edit === cmt._id && this.state.cmtEdited
                                ? this.state.cmtEdited
                                : cmt.comment
                              }</span>
                          }
                        </div>
                          { this.setAuthorComment(cmt)
                          ? <div className="comment">
                              <Link ref="btn-edit-comment" to="#" onClick={() => this.handleEdit(cmt._id, cmt.comment)}><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></Link>
                              <Link to="#" onClick={() => this.handleRemove(id, cmt._id)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></Link>
                            </div>
                          : null
                        }
                      </div>
                    </li>
                  )
                })
              }
            </ul>
            <label htmlFor="commentPost">Comment: { this.state.messages && <b style={{color: 'red'}}>{this.state.messages}</b>}</label>
            <textarea value={this.state.commentPost.comment} onFocus={() => this.setState({isEdit: false})} onChange={this.handleChange} className="form-control" rows="2" name="comment"></textarea>
            { this.state.messages ? this.fadeOutMessages() : null}
          </div>
          <button onClick={this.postComment} className="btn btn-primary">Comment</button>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Comments;
