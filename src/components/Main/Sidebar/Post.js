import React, { Component } from 'react';

import data from '../../data.json';

class Post extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { posts } = data;
    const post = posts[0];
    return(
      <div className="post_sidebar">
        <div className="post_thumb">
          <a href="/"><img src="http://img.spiderum.com/sp-xs-avatar/1d63d230db9511e6a6591d07bc912d86.jpg" alt="thumb" /></a>
        </div>
        <div className="post_content">
        <a id="title_post" href="">{post.title}</a>
        <p id="post_time" className="author_post">bởi <a href="/">{ post.author.name }</a> { post.date } </p>
        </div>
      </div>
    )
  }
}
export default Post;
