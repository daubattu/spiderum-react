import React, { Component } from 'react';
import Panel from '../Main/Panel.js';
import Sidebar from '../Main/Sidebar/Sidebar.js';
import Post from '../Main/Post.js';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Footer from '../Footer.js';

class HotPost extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      maxPage: 0,
      currentPage: 0,
      errors: {}
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
        page.push(<li><Link className="active" onClick={() => this.navPage(i)} to="/">{i + 1} <span className="sr-only">(current)</span></Link></li>);
      } else page.push(<li><Link className="active" onClick={() => this.navPage(i)} to="/">{i + 1} <span className="sr-only">(current)</span></Link></li>);
    }
    return page;
  }

  componentWillMount() {
      axios.get('http://localhost:8080/api/posts')
      .then(res => {
          const { posts, maxPage } = res.data;
          this.setState({ posts, maxPage });
        }
      )
  }
  render() {
    const { posts } = this.state;
    return(
      <main>
        <section id="main" className="container">
          <Panel />
          <div className="main col-lg-7 col-md-8 col-sm-11">
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
                {this.pagination().map(page => {
                  return page;
                })}

              </ul>
            </nav>
            <Footer />
          </div>
          <Sidebar />
        </section>
      </main>
      )
    }
}

export default HotPost;
