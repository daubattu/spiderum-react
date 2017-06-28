import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';

class Comment extends Component {
  constructor() {
    super();
    this.state = {
      post_id: '',
      cmt_id: ''
    }
  }
  componentWillMount() {

  }
  setAuthorComment() {
    if(localStorage.username) {
      const username = localStorage.username;
      if(username === this.props.cmt.username) return true;
    }
    else return false;
  }
  handleEdit(e) {
    e.preventDefault();
  }
  handleRemove(post_id, cmt_id) {
    axios.delete(`http://localhost:8080/api/posts/${post_id}/comments/${cmt_id}`)
      .then(res => {
        axios.get(`http://localhost:8080/api/posts/${post_id}/comments`)
          .then(cmt => {
            this.setState({comments: cmt.data});
          })
      });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({post_id: nextProps.id, cmt_id: nextProps.cmt._id});
  }
  render() {
    const {stt, cmt} = this.props;
    return(
      <li className="list-group-item">
        <div style={{display: 'flex'}}>
          <div>
            {stt + 1}: {cmt.username}: {cmt.comment}
          </div>
            { this.setAuthorComment()
            ? <div className="comment">
                <Link ref="btn-edit-comment" to="#" onClick={this.handleEdit}><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></Link>
                <Link to="#" onClick={() => this.handleRemove(this.props.id, this.props.cmt._id)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></Link>
              </div>
            : null
          }
        </div>
      </li>
    )
  }
}

export default Comment;
