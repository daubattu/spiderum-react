import React, { Component } from 'react';

class Comment extends Component {
  setAuthorComment() {
    if(localStorage.username) {
      const username = localStorage.username;
      if(username === this.props.cmt.username) return true;
    }
    else return false;
  }

  render() {
    return(
      <li className="list-group-item">
      <div style={{display: 'inline-block'}}>
        <div>
          {this.props.stt + 1}: {this.props.cmt.username}: {this.props.cmt.comment}
        </div>
          { this.setAuthorComment()
          ? <div>
              <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </div>
          : null
        }
      </div>
      </li>
    )
  }
}

export default Comment;
