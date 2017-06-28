import React, {Component} from 'react';
import axios from 'axios';
import ProfileInfor from './ProfileInfor.js';
import ProfilePost from './ProfilePost.js';
import {Link} from 'react-router-dom';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      posts: [],
      type: 'infor'
    }
  }
  componentWillMount() {
    let author_id = '';
      axios.get(`http://localhost:8080/api/users/${this.props.match.params.author}`)
      .then(res => {
        this.setState({user: res.data})
        axios.get(`http://localhost:8080/api/posts/author/${res.data._id}`)
          .then(posts => this.setState({posts: posts.data}));
      })
  }
  time() {
    return new Date(this.state.user.birthday);
  }
  setType(type) {
    this.setState({type});
  }
  render() {
    console.log(this.state);
    const styleProfileAuthor = {
      marginTop: '30px',
      background: 'white',
      padding: '30px'
    }
    const styleProfileAvatar = {
      width: '100px',
      height: '100%'
    }
    const styleGlyphyicon = {
      marginRight: '10px'
    }
    const { user } = this.state;
    let time = new Date(`${user.birthday}`);
    return(
      <div style={{marginTop: '135px'}} id="profile" className="container">
        <div className="panel-profile col-lg-3 col-md-3">
          <ul className="list-group">
            <Link to="#" onClick={this.setType.bind(this, 'infor')}><li className="list-group-item">Information Author</li></Link>
            <Link to="#" onClick={this.setType.bind(this, 'post')}><li className="list-group-item">Post Author ({this.state.posts.length} posts)</li></Link>
          </ul>
        </div>
        <div className="main-profile col-lg-9 col-md-9">
          {
            this.state.type === 'infor'
            ? <ProfileInfor user={this.state.user} />
            : <ProfilePost posts={this.state.posts} />
          }
        </div>
      </div>
    )
  }
}
export default Profile;
