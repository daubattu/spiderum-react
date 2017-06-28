import React, { Component } from 'react';
import CKEditor from 'react-ckeditor-wrapper';
import validatePost from '../../validations/validatePost.js';
import axios from 'axios';

class Post  extends Component {
    constructor(props) {
      super(props);
      this.state = {
        post: {
          title: ''
        },
        categories: [],
        errors: {},
        isChecked: true,
        addCategory: false,
        messages: ''
      }
      this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
      this.addCategory = this.addCategory.bind(this);
    }
    handleChange(e) {
      let { post } = this.state;
      post[e.target.id] = e.target.value;
      this.setState({ post });
    }
    handleChangeContent(value) {
      let { post } = this.state;
      post.content = value;
      this.setState({post});
    }
    handleChangeCheckbox(e) {
      this.setState({isChecked: e.target.checked})
    }
    isValid() {
      const { errors, isValid } = validatePost(this.state.post);
      if(errors) {
        this.setState({errors});
      }
      return isValid;
    }
    onClick(e) {
      let { post } = this.state;
      e.preventDefault();
      if(this.isValid()) {
        if(this.state.isChecked) {
          navigator.geolocation.getCurrentPosition(position => {
            post.latitude = position.coords.latitude;
            post.longitude = position.coords.longitude;
            axios.post('http://localhost:8080/api/posts', post)
              .then(res => {
                let post = {};
                post.title = '';
                this.setState({messages: res.data.messages, post});
              }
            );
          });
        } else {
          axios.post('http://localhost:8080/api/posts', post)
            .then(res => {
              const post = {};
              post.title = '';
              this.setState({post});
            }
          );
        }
      }
    }
    addCategory(e) {
      e.preventDefault();
      this.setState({addCategory: !this.state.addCategory});
    }
    componentWillMount() {
      axios.get('http://localhost:8080/api/posts/filter/category')
        .then(res => {
          this.setState({categories: res.data});
        })
    }
    fadeOutMessages() {
      setTimeout(() => {
        this.setState({messages: ''});
      }, 5000);
    }
    render() {
      const options = (
        this.state.categories.map((category, key) => {
          return (
            <option key={key} value={category}>{category}</option>
          )
        })
      )
        return (
          <div style={{marginTop: '135px'}} className="container create_post">
            <form className="col-lg-10 col-lg-offset-1" id="inner">
              <h1>Create new post</h1>
              {this.state.messages && <span style={{color: 'green'}}>{this.state.messages}</span>}
              {this.state.messages && this.fadeOutMessages()}
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input value={this.state.post.title} onChange={this.handleChange.bind(this)} type="text" className="form-control" id="title" />
                { this.state.errors.title && <span className="help-block">{this.state.errors.title}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <CKEditor id="content" value={this.state.post.content} onChange={this.handleChangeContent.bind(this)} />
                { this.state.errors.content && <span className="help-block">{this.state.errors.content}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <div className="input-category">
                  {
                    this.state.addCategory
                    ? <input className="form-control" id="category" name="category" placeholder="Add a category for your post!!!" onChange={this.handleChange.bind(this)} />
                    : <select
                          onChange={this.handleChange.bind(this)}
                          className="form-control"
                          id="category"
                          name="category"
                        >
                          <option value="">Choose your category</option>
                          {options}
                      </select>
                  }
                  <button onClick={this.addCategory} className="btn btn-primary">
                    {
                      this.state.addCategory
                      ? 'Choose Category'
                      : 'Add Other Category'
                    }
                  </button>
                </div>
              </div>
              <div className="checkbox">
                <label>
                  <input id="isChecked" checked={this.state.isChecked} onChange={this.handleChangeCheckbox} type="checkbox" /> Cho phép vị trí
                </label>
              </div>
              <button className="btn btn-primary" onClick={this.onClick.bind(this)}>Public</button>
            </form>
          </div>
      )
    }
}

export default Post;
