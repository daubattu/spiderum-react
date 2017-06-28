import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import time from '../../utils/time.js';
class Author extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: {}
    }
  }

  componentWillMount() {
    axios.get(`http://localhost:8080/api/users/${this.props.post.author.user_id}`)
      .then(res => {
        this.setState({author: res.data});
      })
  }

  componentWillReceiveProps(nextProps) {
    if(!_.isEqual(this.props.post, nextProps.post)){
      axios.get(`http://localhost:8080/api/users/${nextProps.post.author.user_id}`)
        .then(res => {
          this.setState({author: res.data});
      })
    }
  }

  render() {
    const { post } = this.props;
    return(
      <div className="author">
        <div className="avatar">
          {
            this.state.author.avatar
            ? <img src={this.state.author.avatar} alt="author"/>
            : <img src="https://facebook.github.io/react/img/logo_og.png" alt="author"/>
          }
        </div>
        <div className="info-post">
          <div id="category-post">
            <Link to={`/profile/${post.author.user_id}`}><b>{post.author.name}</b></Link>
            {
              post.category && <b> trong </b>
            }
            {
              post.category && <Link to={`/category/${post.category.replace(/ /g, '-')}`}>{ post.category }</Link>
            }
          </div>
          <div><i className="fa fa-pencil-square-o" aria-hidden="true"></i> đăng { time(post.date) }</div>
        </div>
      </div>
    )
  }
}
export default Author;
