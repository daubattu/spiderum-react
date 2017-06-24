import React from 'react';
import ReactDOM from 'react-dom';
import setAuthorizationToken from './utils/setAuthorizationToken.js';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import About from './components/About/About.js';
import Header from './components/Header.js';
import App from './App.js';
import Post from './components/Admin/Post.js';
import Login from './components/Admin/Login.js';
import Signup from './components/Admin/Signup.js';
import Blog from './components/Blog/index.js';
import Profile from './components/Admin/Profile.js';
import ProfileAuthor from './components/Admin/ProfileAuthor.js';
import HostPost from './components/Blog/HotPost.js';

if(localStorage.getItem('token')) {
  setAuthorizationToken(localStorage.getItem('token'));
}

ReactDOM.render(
  <Router>
    <div>
      <Header />
      <Route exact path="/" component={App} />
      <Route path="/about" component={About} />
      <Route path="/post" component={Post} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/me" component={Profile} />
      <Route path="/profile/:author" component={ProfileAuthor} />
      <Route path="/blog/:identify" component={Blog} />
      <Route path="/hot" component={HostPost} />
    </div>
  </Router>,
  document.getElementById('root')
);
