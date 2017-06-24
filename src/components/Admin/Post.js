import React, { Component } from 'react';
import CKEditor from 'react-ckeditor-wrapper';
import validateInput from '../../validations/Post.js';
import axios from 'axios';

class Post  extends Component {
    constructor(props) {
      super(props);
      this.state = {
        post: {
          title: '',
          content: '',
          category: '',
          date: new Date(),
          thumbnail: ''
        },
        categories: [],
        errors: {}
      }
    }

    handleChange(e) {
      let { post } = this.state;
      post[e.target.id] = e.target.value;
      this.setState({ post });
    }
    handleChangeContent(value) {
      let { post } = this.state;
      post.content = value;
      console.log(value);
      this.setState({post});
    }
    isValid() {
      const { errors, isValid } = validateInput(this.state.post);
      if(errors) {
        this.setState({errors});
      }
      return isValid;
    }
    onClick(e) {
      e.preventDefault();
      if(this.isValid()) {
        var img,
        urls = [],
        str = this.state.post.content,
        rex =  /<img.*?src="([^">]*\/([^">]*?))".*?>/g;
        while ( img = rex.exec( str ) ) {
            urls.push( img[1] );
        }
        
        this.state.post.thumbnail = urls[0];

        axios.post('http://localhost:8080/api/posts', this.state.post)
          .then(
            (res) => {
              console.log(res.data);
              const post = {
                title: '',
                content: '',
                category: '',
                date: new Date()
              }
              this.setState({post});
            },
            (err) => console.log(err.data)
          );
      }
    }
    componentWillMount() {
      axios.get('http://localhost:8080/api/posts/filter/category')
        .then(res => {
          this.setState({categories: res.data});
        })
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
          <div className="container create_post">
            <form className="col-lg-10 col-lg-offset-1" id="inner">
              <h1>Create new post</h1>
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
                <select
                  onChange={this.handleChange.bind(this)}
                  className="form-control"
                  id="category"
                  name="category"
                >
                  <option value="">Choose your category</option>
                  {options}
                </select>
              </div>
              <button className="btn btn-primary" onClick={this.onClick.bind(this)}>Public</button>
            </form>
          </div>
      )
    }
}

export default Post;
