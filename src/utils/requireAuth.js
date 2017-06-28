import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function(ComposedComponent) {
  class Authenticate extends Component {
    componentWillMount() {
      if(!localStorage.token) {
        this.props.history.push('/');
      }
    }
    componentWillUpdate(nextProps) {
      if(!localStorage.token){
        this.props.history.push('/');
      }
    }
    render() {
      return(
        <ComposedComponent {...this.props} />
      )
    }
  }
  return Authenticate;
}
