import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

class Author extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: {}
    }
  }

  time() {
    let timeString = new Date(this.props.post.date);
    let time = Math.floor((new Date - timeString)/864000/24/4);
    if(time < 365) {
      if(time < 2) {
        return moment(timeString, "YYYYMMDD").fromNow();
      } else {
        return `${timeString.getDate()} tháng ${timeString.getMonth() + 1} năm  ${timeString.getFullYear()}`
      }
    } else {
      let years = (new Date).getFullYear() - timeString.getFullYear();
      return `${years} năm trước`;
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
              post.category && <a href="">{ post.category }</a>
            }
          </div>
          <div>{ this.time() }</div>
        </div>
      </div>
    )
  }
}
export default Author;
