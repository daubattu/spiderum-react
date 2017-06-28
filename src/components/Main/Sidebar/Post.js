import React, { Component } from 'react';
import time from '../../../utils/time.js';
import { Link } from 'react-router-dom';
import customizeTitle from '../../../utils/customizeTitle.js';

class Post extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { post } = this.props;
    return(
      <div className="post_sidebar">
        <div className="post_thumb">
        { post.thumbnail
          ? <img src={post.thumbnail}/>
          : <img src="https://s3-ap-southeast-1.amazonaws.com/img.spiderum.com/sp-thumbnails/defaultthumbnail.png" />
        }
        </div>
        <div className="post_content">
        <a id="title_post" href="">{ customizeTitle(post.title, 40) }</a>
        <p id="post_time" className="author_post">bởi <Link to={`/profile/${post.author.user_id}`}>{ post.author.name }</Link> { time(post.date) } </p>
        </div>
      </div>
    )
  }
}
export default Post;
