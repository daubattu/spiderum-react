import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Main from './Main.js';
import axios from 'axios';
import Post from './Post.js';
import Footer from '../Footer.js';
import Sidebar from './Sidebar/Sidebar.js';
import classNames from 'classnames';

class Panel extends Component {
  constructor() {
    super();
    this.state = {
      widthScreen: '',
      url: '',
      posts: [],
      maxPage: 0,
      currentPage: 0,
    }
    this.updateResize = this.updateResize.bind(this);
  }
  updateResize() {
    let widthScreen = document.getElementsByTagName('body')[0].clientWidth;
    this.setState({ widthScreen });
  }
  componentWillMount() {
    axios.get('http://localhost:8080/api/posts')
      .then(res => {
        this.setState({posts: res.data.posts, maxPage: res.data.maxPage});
      });
    this.updateResize();
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateResize);
  }
  setFilter(filter) {
    if(filter === '' || filter === 'hot') {
      axios.get('http://localhost:8080/api/posts')
        .then(res => {
          this.setState({posts: res.data.posts, maxPage: res.data.maxPage, url: ''});
        })
    } else {
      axios.get(`http://localhost:8080/api/posts/${filter}`)
        .then(res => {
          this.setState({posts: res.data.posts, maxPage: res.data.maxPage, url: filter});
        })
    }
  }
  navPage(page) {
    axios.get(`http://localhost:8080/api/posts?page=${page}`)
      .then(res => {
        this.setState({posts: res.data.posts})
      })
  }
  pagination(){
    let page = [];
    for(let i = 0; i < Math.floor(this.state.maxPage/5) + 1; i++) {
      if(i === this.state.currentPage) {
        page.push(<li><Link className="active" onClick={() => this.navPage(i)} to="">{i + 1} <span className="sr-only">(current)</span></Link></li>);
      } else page.push(<li><Link className="active" onClick={() => this.navPage(i)} to="">{i + 1} <span className="sr-only">(current)</span></Link></li>);
    }
    return page;
  }
  renderPanel() {
    const panelLarge = (
      <ul>
        <Link to="" onClick={this.setFilter.bind(this, '')}>
          <li className={ classNames({ hot: this.state.url === '' }) }>
            <span className="glyphicon glyphicon-star-empty"></span>
            {this.state.widthScreen > 1200 && 'Mới nhất'}
          </li>
        </Link>
        <Link to="" onClick={this.setFilter.bind(this, 'hot')}>
          <li className={ classNames({ hot: this.state.url === 'hot' }) }>
          <span className="glyphicon glyphicon-fire"></span>
          {this.state.widthScreen > 1200 && 'Đang hot'}
          </li>
        </Link>
        <Link to="" onClick={this.setFilter.bind(this, 'controversial')}>
          <li className={ classNames({ hot: this.state.url === 'controversial' }) }>
            <span className="glyphicon glyphicon-refresh"></span>
            {this.state.widthScreen > 1200 && 'Sôi nổi'}
          </li>
        </Link>
        <Link to="" onClick={this.setFilter.bind(this, 'top')}>
          <li className={ classNames({ hot: this.state.url === 'top' }) }>
            <span className="glyphicon glyphicon-king"></span>
            {this.state.widthScreen > 1200 && 'Top'}
          </li>
        </Link>
      </ul>
    )
    const panelSmall = (
      <ul>
        <li id="hot"><span className="glyphicon glyphicon-fire"></span>Đang hot</li>
        <li><span className="glyphicon glyphicon-star-empty"></span>Mới nhất</li>
        <li><span className="glyphicon glyphicon-pencil"></span>Viết bài</li>
        <li><span className="glyphicon glyphicon-refresh"></span>Sôi nổi</li>
        <li><span className="glyphicon glyphicon-king"></span>Top</li>
      </ul>
    )
    if(this.state.widthScreen < 768) {
      return panelSmall;
    } else if(this.state.widthScreen > 768) {
      return panelLarge;
    }
  }
  render() {
    return(
      <div className="container">
        <div className="panel col-lg-2 col-md-1" id="panel">
          {this.renderPanel()}
        </div>
        <section id="main">
            <div className="main col-lg-7 col-md-8">
              {
                this.state.posts.map((post, index) => {
                  return(
                    <Post key={index} post={post}/>
                  )
                })
              }
              <nav aria-label="...">
                <ul className="pagination">
                  <li><a href="/" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
                  {
                    this.pagination().map(page => {
                      return page;
                    })
                  }
                </ul>
              </nav>
              <Footer />
            </div>
            <Sidebar />
        </section>

      </div>
    )
  }
}

export default Panel;
