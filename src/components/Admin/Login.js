import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import validateLogin from '../../validations/validateLogin.js';
import setAuthorizationToken from '../../utils/setAuthorizationToken.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        password: ''
      },
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(e) {
    let user = this.state;
    user[e.target["id"]] = e.target.value;
    this.setState({user});
  }

  handleClick(e) {
    this.setState({errors: {}});
    e.preventDefault();
    let { errors, isValid } = validateLogin(this.state.user);
    if(isValid) {
      if(!localStorage.getItem('token')) {
        axios.post('http://localhost:8080/login', this.state.user)
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user_id', res.data.user._id);
          setAuthorizationToken(res.data.token);
          localStorage.setItem('username', this.state.username);
          this.props.history.push('/');
        }).catch(err => {
          this.setState({errors: err.response.data.errors});
        })
      }
    } else {
      this.setState({errors});
    }
  }

  render() {
    const { errors } = this.state;
    return(
      <div style={{marginTop: '105px'}} className="container" id="login-form">
        <form className="col-lg-6 col-lg-offset-3" id="inner">
          <h1>Login</h1>
          <div className="form-group">
            <label htmlFor="identify">Username</label>
            <input onChange={this.handleChange} type="text" className="form-control" id="username" />
            { errors.username && <span className="help-block">{errors.username}</span> }
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input onChange={this.handleChange} type="password" className="form-control" id="password" />
            { errors.password && <span className="help-block">{errors.password}</span> }
          </div>
          <button onClick={this.handleClick} className="btn btn-primary">Login</button>
        </form>
      </div>
    )
  }
}
export default Login;
