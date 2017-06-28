import React, {Component} from 'react';
import axios from 'axios';
import Post from './Post.js';

class Category extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      category: ''
    }
  }
  componentWillMount() {
    let category = this.props.match.params.category;
    console.log(this.props.match.params.category);
    console.log(category.replace(/-/g, " "));
    category = category.replace(/-/g, " ");
    axios.get(`http://localhost:8080/api/posts/filter/category/${category}`)
      .then(res => {
        this.setState({category, posts: res.data})
        console.log(res);
      })
  }
  render() {
    const posts = this.state.posts;
    return(
      <div style={{marginTop: '135px'}} className="category">
        <div className="container">
          {
            posts.map((post, index) => {
              return (
                <div className="post-category col-lg-6 col-lg-offset-3">
                  <Post post={post} />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Category;
