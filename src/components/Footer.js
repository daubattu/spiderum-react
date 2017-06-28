import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      widthScreen: '',
      heightPanel: ''
    }
    this.updateResize = this.updateResize.bind(this);
  }
  updateResize() {
    let widthScreen = document.getElementsByTagName('body')[0].clientWidth;
    if(document.getElementById('panel')) {
      let heightPanel = document.getElementById('panel').clientHeight;
      if(heightPanel > 1000) heightPanel = 0;
      this.setState({ widthScreen, heightPanel});
    } else this.setState({ widthScreen });
  }
  componentDidMount() {
      this.updateResize();
      window.addEventListener("resize", this.updateResize);
  }
  componentWillUnmount() {
        window.removeEventListener("resize", this.updateResize);
  }

  render() {
    let footerStyle;
    if(this.state.widthScreen < 768) {
        footerStyle = {
          marginBottom: this.state.heightPanel
        }
    } else {
      footerStyle: {
        marginBottom: 0
      }
    }
    return(
      <footer style={footerStyle}>
          <ul id="list-link">
            <li><Link to="/about">About me</Link></li>
            <li><a href="/">Điều khoản sử dụng</a></li>
          </ul>
          <p>Design by <a href="/">Nguyễn Hưng Khánh</a></p>
      </footer>
    )
  }
}

export default Footer;
