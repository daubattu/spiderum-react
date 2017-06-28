import React, { Component } from 'react';
import validateSignup from '../../validations/validateSignup.js';
import axios from 'axios';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        birthday: '',
        gender: ''
      },
      errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
      let user = this.state.user;
      user[e.target["name"]] = e.target.value;
      this.setState({user});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({errors: {}});
    console.log(this.state.user);
    let { errors, isValid } = validateSignup(this.state.user);
    console.log(errors, isValid);
    if(isValid) {
      axios.post('http://localhost:8080/signup', this.state.user)
        .then(res => {
          this.props.history.push('/login');
          if(res.data.errors) {
            this.setState({errors: res.data.errors});
          }
        })
    } else {
      this.setState({errors});;
    }
  }

  render() {
    const { errors } = this.state;
    return(
      <div style={{marginTop: '105px'}} className="container" id="signup-form">
        <form onSubmit={this.handleSubmit} id="inner" className="col-lg-6 col-lg-offset-3">
          <h1>Sign Up</h1>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input onChange={this.handleChange} type="type" className="form-control" name="username" placeholder="Username" />
            { errors.username && <span className="help-block">{errors.username}</span> }
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input onChange={this.handleChange} type="type" className="form-control" name="email" placeholder="Email" />
            { errors.email && <span className="help-block">{errors.email}</span> }
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input onChange={this.handleChange} type="password" className="form-control" name="password" placeholder="Password" />
            { errors.password && <span className="help-block">{errors.password}</span> }
          </div>
          <div className="form-group">
            <label htmlFor="passwordConfirm">Password Confirm</label>
            <input onChange={this.handleChange} type="password" className="form-control" name="passwordConfirm" placeholder="Password Confirm" />
            { errors.passwordConfirm && <span className="help-block">{errors.passwordConfirm}</span> }
          </div>
          <div className="form-group">
            <label htmlFor="birthday">Birthday: </label>
            <input onChange={this.handleChange} type="date" name="birthday" />
            { errors.birthday && <span className="help-block">{errors.birthday}</span> }
          </div>
          <div className="form-group">
            <label>Gender: </label>
            <input onChange={this.handleChange} type="radio" name="gender" checked={this.state.user.gender === 'male'} value="male" /> Male |
            <input onChange={this.handleChange} type="radio" name="gender" checked={this.state.user.gender === 'female'} value="female" /> Female
            { errors.gender && <span className="help-block">{errors.gender}</span> }
          </div>
          <div className="form-group">
            <button id="btn-signup" className="btn btn-primary">Sign up</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Signup;
