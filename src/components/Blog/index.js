import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from '../Main/Sidebar/Sidebar.js';
import { Link } from 'react-router-dom';
import Comments from './Comments.js';
import Footer from '../Footer.js';
import time from '../../utils/time.js';
import _ from 'lodash';

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        comments: [],
        tags: [],
        author: {}
      },
      sttTagEdit: 0,
      tagEdit: '',
      tagEdited: '',
      author: {},
      isEdit: false,
      isAddTag: false,
      tagAdd: '',
      errors: {},
      messages: '',
      name_author: ''
    }
    this.handleAddTag = this.handleAddTag.bind(this);
  }
  componentDidMount() {
    let _this = this;
      this.serverRequest =
      axios
        .get(`http://localhost:8080/api/posts/${this.props.match.params.identify}`)
        .then(res => {
          let post = res.data;
          this.setState({post})
          axios.get(`http://localhost:8080/api/users/${post.author.user_id}`)
            .then(user => _this.setState({name_author: post.author.name, author: user.data}));
        });
  }
  componentWillMount() {
     this.serverRequest;
  }
  handleRemoveTag(tag) {
    axios.delete(`http://localhost:8080/api/posts/${this.state.post._id}/tags/${tag}`)
      .then(res => {
        let post = this.state.post;
        post.tags = res.data;
        this.setState({messages: 'Delete tag complete!!!', post});
      })
  }
  handleEditTag(post_id, tag, index) {
    if(!_.isEmpty(this.state.tagEdited)) {
      axios.get(`http://localhost:8080/api/posts/${post_id}/tags`)
        .then(tags => this.setState({tags: tags.data}));
    }
    this.setState({sttTagEdit: index, tagEdit: tag, isEdit: !this.state.isEdit});
  }
  handleUpdateEditTag(post_id, tag) {
    axios.put(`http://localhost:8080/api/posts/${post_id}/tags`, {tag, tag_content: this.state.tagEdit})
      .then(res => {
        this.setState({tagEdited: res.data});
        axios.get(`http://localhost:8080/api/posts/${post_id}`)
          .then(tags => {
            this.setState({isEdit: false, post: tags.data})
          });
      });
  }
  handleChange(e) {
    this.setState({[e.target["id"]]: e.target.value})
  }
  handleAddTag(e) {
    axios.post(`http://localhost:8080/api/posts/${this.state.post._id}/tags`, {tags: this.state.tagAdd})
      .then(res => {
        let post = this.state.post;
        post.tags = res.data.tags;
        this.setState({messages: 'Add tags complete', post, isAddTag: false, tagAdd: ''});
      }).catch(err => {
        console.log('catch', err.response);
        this.setState({messages: err.response.data.messages || err.response.data.deprecated});
        if(err.response.data.messages) {

        }
        console.log(err);
      });
  }
  fadeOutMessages() {
    setTimeout(() => {
      this.setState({messages: ''});
    }, 5000);
  }
  render() {
    const post = this.state.post;
    const tagEdit = this.state.tagEdit;
    console.log('username', this.state.name_author);
    return(
      <div id="post">
          <div className="container">
            <div className="author">
              <div className="avatar">
                {
                  this.state.author.avatar
                  ? <img src={this.state.author.avatar} alt="author"/>
                  : <Link to={`/profile/${this.state.author._id}`}><img src="https://facebook.github.io/react/img/logo_og.png" alt="author"/></Link>
                }
              </div>
              <div className="info-post">
                <div id="category-post">
                  <Link to={`/profile/${this.state.author._id}`}><b>{this.state.author.username}</b></Link>
                  {
                    post.category && <b> trong </b>
                  }
                  {
                    post.category && <Link to={`/category/${post.category.replace(/ /g, '-')}`}>{ post.category }</Link>
                  }
                </div>
                <div><i className="fa fa-pencil-square-o" aria-hidden="true"></i> đăng { time(post.date) }</div>
                <b><p><i className="fa fa-eye" aria-hidden="true"></i> {post.views}</p></b>
              </div>
            </div>
            <div className="content-post" dangerouslySetInnerHTML={{__html: this.state.post.content}}></div>
            <div id="tags-post">
              <span id="icon-tag" className="glyphicon glyphicon-tags"></span>
                {
                  this.state.post.tags
                    ? this.state.post.tags.map((tag, index) => {
                        return <span key={index} id="tag">
                          {
                            this.state.isEdit && index === this.state.sttTagEdit
                            ? <div>
                                <input type="text" id="tagEdit" value={this.state.tagEdit} onChange={(e) => this.handleChange(e)} />
                                <button onClick={() => this.handleUpdateEditTag(post._id, tag)} className='btn btn-xs btn-primary'>Update</button>
                              </div>
                            : <span>
                                {
                                  index === this.state.sttTagEdit && this.state.tagEdited
                                  ? this.state.tagEdited || tag
                                  : tag
                                }
                              </span>
                          }
                          {
                            tag && post.author.name === localStorage.username || localStorage.username === 'admin'
                            ? <span>
                                <Link to="#">
                                    <span
                                      onClick={() => { this.handleEditTag(post._id, tag, index) }}
                                      id="icon-edit-tag" className="glyphicon glyphicon-pencil">
                                    </span>
                                </Link>
                                <Link key={index} to="#">
                                    <span
                                      onClick={() => { this.handleRemoveTag(tag) }}
                                      id="icon-remove-tag" className="glyphicon glyphicon-remove">
                                    </span>
                                </Link>
                              </span>
                            : ''
                          }
                        </span>
                      })
                    : null
                }
              { post.author.name === localStorage.username || localStorage.username === 'admin'
                ? <span>
                      <span onClick={() => {this.setState({isAddTag: !this.state.isAddTag})}} id="icon-add-tag" className="glyphicon glyphicon-plus-sign"></span>
                        {
                          this.state.isAddTag
                          ? <div id="add-tag-group">
                              <input type="text" id="tagAdd" value={this.state.tagAdd} onChange={(e) => this.handleChange(e)} />
                              <button id="btn-add-tag" onClick={this.handleAddTag} className="btn btn-xs btn-primary">Add</button>
                            </div>
                          : null
                        }
                    </span>
                  : ''
              }
            </div>
            {this.state.messages && <span style={{color: 'red', marginBottom: '3px'}}>{this.state.messages}</span>}
            {this.state.messages && this.fadeOutMessages()}
          </div>
          <Comments id={this.state.post._id} />
      </div>
    )
  }
}
export default Blog;
