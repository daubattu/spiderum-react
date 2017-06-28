import React, { Component } from 'react';
import Author from './Author.js';
import { Link } from 'react-router-dom';
import { fadeIn } from 'react-animations';
import htmlToText from 'html-to-text';
import moment from 'moment';
import _ from 'lodash';

class Post extends Component {
  render() {
    console.log('render');
    const { post } = this.props;

    let img,
    urls = [],
    str = post.content,
    rex =  /<img.*?src="([^">]*\/([^">]*?))".*?>/g;
    while ( img = rex.exec( str ) ) {
        urls.push( img[1] );
    }

    for(let index in urls) {
      if(post.content.includes(urls[index])) {
        post.content = post.content.replace(urls[0], '');
      }
    }
    post.content = htmlToText.fromString(post.content);
    if(post.content.length > 200) {
      post.content = post.content.slice(0, 200) + ' ...';
    }
    if(post.title.length > 50) {
      post.title = post.title.slice(0, 50) + ' ...';
    }

    return(
      <div className="inner">
        <Author post={post}/>
        <Link to={`/blog/${post._id}`}>
          <div className="thumb">
            { post.thumbnail
              ? <img src={post.thumbnail}/>
              : <img src="https://s3-ap-southeast-1.amazonaws.com/img.spiderum.com/sp-thumbnails/defaultthumbnail.png" />
            }
          </div>
        </Link>
        <h3 id="title"><a href={`/blog/${post._id}`}>{post.title}</a></h3>
        {post.content}
        <div className="toolbar clearfix">
            <div className="pull-left">
              <div className="vote-box">
                <span id="viewCount">{post.views}</span>
              </div>
            </div>
            <div className="pull-right">
              <span><Link to={`/blog/${post._id}#comments`}>{post.comments.length} Bình luận</Link></span>
              <span id="share" className="glyphicon glyphicon-share-alt"></span>Chia sẻ
              <span id="bookmark" className="glyphicon glyphicon-bookmark"></span>
            </div>
        </div>
      </div>
    )
  }
}

export default Post;
