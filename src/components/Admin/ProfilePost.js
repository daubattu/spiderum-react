import React, { Component } from 'react';
import Post from '../Main/Post.js';

class ProfilePost extends Component {
  render() {
    const posts = this.props.posts;
    return(
      <div className="profile-post">
        {
          posts.map((post, index) => {
            return (
              <Post key={index} post={post} />
            )
          })
        }
      </div>
    )
  }
}

export default ProfilePost;
