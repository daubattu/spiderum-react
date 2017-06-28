import React, { Component } from 'react';
import axios from 'axios';
import customizeTitle from '../../utils/customizeTitle.js';
import Modal from 'react-modal';
import CKEditor from 'react-ckeditor-wrapper';
import {Link} from 'react-router-dom';
import time from '../../utils/time.js';
import _ from 'lodash';

class CPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isOpen: false,
      post: {
        title: '',
        location: []
      },
      messages: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    if(localStorage.username === 'admin') {
      axios.get('http://localhost:8080/api/posts')
        .then(res => {
          this.setState({posts: res.data.posts});
        })
    } else {
      axios.get(`http://localhost:8080/api/users/${localStorage.user_id}/posts`)
        .then(res => {
          this.setState({posts: res.data});
        })
    }
  }
  handleRemove(id) {
    axios.delete(`http://localhost:8080/api/posts/${id}`)
      .then(res => {
        if(localStorage.username === 'admin') {
          axios.get('http://localhost:8080/api/posts')
          .then(res => {
            this.setState({posts: res.data.posts});
          })
        } else {
          axios.get(`http://localhost:8080/api/users/${localStorage.user_id}/posts`)
          .then(res => {
            this.setState({posts: res.data});
          })
        }
      })
  }
  handleChangeContent(value) {
    let { post } = this.state;
    post.content = value;
    this.setState({post});
  }
  handleChange(e) {
    let post = this.state.post;
    post[e.target["id"]] = e.target.value;
    this.setState({post});
  }
  handleSubmit(e) {
    e.preventDefault();
    let { post } = this.state;
    if(!_.isEmpty(post.location)) {
      post.latitude = post.location.latitude;
      post.longitude = post.location.longitude;
    }
    delete post.location;
    console.log('post', post);
    axios.put(`http://localhost:8080/api/posts/${post._id}`, post)
      .then(res => this.setState({isOpen: false, messages: res.data.messages}))
      .catch(err => this.setState({messages: err.response.data.messages.message}))
  }
  fadeOutMessages() {
    setTimeout(() => {
      this.setState({messages: ''});
    }, 5000);
  }
  showTableEdit(post) {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="table-edit">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input onChange={this.handleChange} className="form-control" id="title" value={post.title}/>
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <CKEditor id="content" value={post.content} onChange={this.handleChangeContent.bind(this)} />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input className="form-control" id="category" value={post.category} onChange={this.handleChange.bind(this)} />
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input onChange={this.handleChange} className="form-control" id="tags" value={post.tags}/>
          </div>
        </div>

        <button id="btn-remove-modal" onClick={() => this.setState({isOpen: false, post: {}})} className="btn btn-danger">
          <span className="glyphicon glyphicon-remove"></span>
        </button>
        <div className="form-group">
          <button id="btn-edit-post" className="btn btn-primary">Update</button>
        </div>
      </form>
    )
  }
  render() {
    const { posts } = this.state;
    console.log(this.state.posts);
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };
    let editTable = '';
    return(
      <div style={{marginTop: '135px'}} className="cpanel-admin container">
        <div>
          <h2>CPanel Admin</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Stt</th>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {
              posts.map((post, index) => {
                return(
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td><Link to={`/blog/${post._id}`}>{ customizeTitle(post.title, 50) }</Link></td>
                      <td><Link to={`/profile/${post.author.user_id}`}>{ post.author.name }</Link></td>
                      <td>{ time(post.date) }</td>
                      <td>{post.category}</td>
                      <td>
                        <button onClick={() => this.handleRemove(post._id)} className="btn btn-sm btn-danger">
                          <span className="glyphicon glyphicon-remove"></span>
                        </button>
                        <button onClick={() => {
                          this.setState({isOpen: true, post});
                          editTable = this.showTableEdit(post);
                        }} className="btn btn-sm btn-primary">
                          <span className="glyphicon glyphicon-pencil"></span>
                        </button>
                      </td>
                    </tr>
                )
              })
            }
            </tbody>
          </table>
          { this.state.messages && <label><b style={{color: 'green'}}>{this.state.messages}</b></label>}
          { this.state.messages ? this.fadeOutMessages() : null  }
        </div>
        {
          this.state.isOpen
          ? this.showTableEdit(this.state.post)
          : null
        }
      </div>
    )
  }
}

export default CPanel;
