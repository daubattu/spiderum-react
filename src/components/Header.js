import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import setAuthorizationToken from '../utils/setAuthorizationToken.js';
import classNames from 'classnames';

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      offsetTop: 0,
      lastScroll: 0,
      transform: {},
      isAuthenticate: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    setAuthorizationToken('');
    this.setState({isAuthenticate: this.state.isAuthenticate});
  }
  handleScroll(event) {
      let scrollTop = event.srcElement.body.scrollTop;
      let lastScroll = this.state.lastScroll;

      console.log(lastScroll, scrollTop);

      let transform = {};
      if(scrollTop > 29 && scrollTop > lastScroll) {
        transform = {
          transform: 'translate(0px, -65px)',
          position: 'fixed',
          transition: 'transform 0.35s linear'
        }
      } else {
        transform = {
          transform: 'translate(0px, 0px)',
          position: 'fixed',
          transition: 'transform 0.35s linear'
        }
      }
      this.setState({transform, lastScroll: scrollTop});
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
  }
  render() {
    const guest = (
      <ul className="account">
          <li><Link to="/login">Login</Link> | <Link to="/signup">Signup</Link></li>
      </ul>
    )
    const user = (
      <ul className="account">
          <li className="hidden-xs"><Link className="post" to="/post">Post</Link></li>
          <li>
            <div className="dropdown">
              <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Hi! <b>{localStorage.getItem('username')}</b>
                <span className="caret"></span>
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li><Link to="/me">Profile</Link></li>
                <li className="divider"></li>
                <li onClick={this.handleClick}><Link to="/">Logout</Link></li>
              </ul>
            </div>
        </li>
      </ul>
    )

    return(
        <header style={this.state.transform}>
          <div className="container">
            <div className="header-top" >
              <div className="header-left">
                <div className="logo">
                  <a href="/"><img src="/images/logo.png" alt="logo"/></a>
                </div>
                <form action="account.php">
                  <input type="submit" name="" />
                  <input type="text" name="" placeholder="Tìm kiếm..." />
                </form>
              </div>
              <div className="header-right">
                {
                  localStorage.token ? user : guest
                }
              </div>
            </div>
            <nav className="navbar navbar-default">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-content" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>
                <div className="collapse navbar-collapse" id="navbar-content">
                  <ul className="nav navbar-nav">
                    <li><a href="">Cho bạn</a></li>
                    <li><a href="">Tất cả</a></li>
                    <li><a href="">Thành viên nổi bật</a></li>
                    <li><a href="">Quan điểm - Tranh luận</a></li>
                    <li><a href="">Science2vn</a></li>
                    <li><a href="">Sách</a></li>
                    <li><a href="">Danh mục khác</a></li>
                  </ul>
                </div>
           </nav>
          </div>
        </header>
    )
  }
}

export default Navigation;
