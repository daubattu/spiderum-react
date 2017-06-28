import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class ProfileInfor extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      user: {},
      messages: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  time(time) {
    time = new Date(time);
    let day = time.getDate(), month = time.getMonth() + 1, year = time.getFullYear();
    return `${day}/${month}/${year}`;
  }
  handleChange(e) {
    let user = this.state.user;
    user[e.target["name"]] = e.target.value;
    this.setState({user});
  }
  handleUpdate() {
    const user = this.state.user;
    console.log(this.state.user);
    axios.put(`http://localhost:8080/api/users/${this.state.user._id}`, user)
      .then(res => {
        this.setState({messages: res.data.messages, isOpen: false})
      });
  }
  fadeOutMessages() {
    setTimeout(() => {
      this.setState({messages: ''});
    }, 5000);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({user: nextProps.user});
  }
  render() {
    const user = this.props.user;
    return(
      <div className="profile-infor">
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Information</h3>
          </div>
          <div className="panel-body">
            <div className="avatar-profile">
            {
              user.avatar
              ? <img src={user.avatar} alt="author" />
              : <img src="https://facebook.github.io/react/img/logo_og.png" alt="author"/>
            }
            </div>
            <div className="infor-profile">
            <table className="table">
              <tbody>
                <tr>
                  <td>Username</td>
                  <td><b>{user.username}</b></td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td><b>{user.address}</b></td>
                </tr>
                <tr>
                  <td>Job</td>
                  <td><b>{user.job}</b></td>
                </tr>
                <tr>
                  <td>Birthday</td>
                  <td><b>{this.time(user.birthday)}</b></td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td><b>{user.gender}</b></td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
          <div className="panel-footer">
            <a data-original-title="Broadcast Message" data-toggle="tooltip" type="button" className="btn btn-sm btn-primary"><i className="glyphicon glyphicon-envelope"></i></a>
            {this.state.messages && <span style={{marginLeft: '30px'}} className="alert alert-success">{this.state.messages}</span>}
            {this.state.messages && this.fadeOutMessages()}
            {
              user.username === localStorage.username
              ? <span className="pull-right">
                  <Link to="#" onClick={() => {
                    this.setState({isOpen: true})
                  }} className="btn btn-sm btn-warning">
                    <i className="glyphicon glyphicon-edit"></i>
                  </Link>
                  <Link to="#" onClick={() => console.log('Remove')} className="btn btn-sm btn-danger">
                    <i className="glyphicon glyphicon-remove"></i>
                  </Link>
                </span>
              : null
            }
          </div>
        </div>
        <Modal
          isOpen={this.state.isOpen}
          style={customStyles}
          contentLabel="Modal"
        >
          <Link to="#" onClick={() => this.setState({isOpen: false})} id="remove-modal-profile" className="btn btn-sm btn-danger">
            <i className="glyphicon glyphicon-remove"></i>
          </Link>
          <table className="table" id="table-update-profile">
            <tbody>
              <tr>
                <td>Username</td>
                <td><b>{user.username}</b></td>
              </tr>
              <tr>
                <td>Avatar</td>
                <td><input onChange={this.handleChange} name="avatar" type="text" value={this.state.user.avatar} /></td>
              </tr>
              <tr>
                <td>Address</td>
                <td><input onChange={this.handleChange} name="address" type="text" value={this.state.user.address} /></td>
              </tr>
              <tr>
                <td>Job</td>
                <td><input onChange={this.handleChange} name="job" type="text" value={this.state.user.job} /></td>
              </tr>
              <tr>
                <td>Birthday</td>
                <td><input onChange={this.handleChange} name="birthday" type="date" value={this.state.user.birthday} /></td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>
                  <input onChange={this.handleChange} type="radio" name="gender" checked={this.state.user.gender === 'male'} value="male" /> Male |
                  <input onChange={this.handleChange} type="radio" name="gender" checked={this.state.user.gender === 'female'} value="female" /> Female
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => this.handleUpdate()} className="btn btn-xs btn-primary">Update</button>
        </Modal>
      </div>
    )
  }
}

export default ProfileInfor;
