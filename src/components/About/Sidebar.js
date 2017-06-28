import React, { Component } from 'react';
import info from './info.json';

class SideBar extends Component {
  render() {
    return(
      <div className="sidebar-wrapper">
          <div className="profile-container">
              <img className="profile" src="assets/images/profile.png" alt="" />
              <h1 className="name">{info.name}</h1>
              <h3 className="tagline">Font-end Developer</h3>
          </div>

          <div className="contact-container container-block">
              <ul className="list-unstyled contact-list">
                  <li className="email"><i className="fa fa-envelope"></i><a href="mailto: yourname@email.com">alan.doe@website.com</a></li>
                  <li className="phone"><i className="fa fa-phone"></i><a href="tel:0123 456 789">0123 456 789</a></li>
                  <li className="website"><i className="fa fa-globe"></i><a href="http://themes.3rdwavemedia.com/website-templates/free-responsive-website-template-for-developers/" target="_blank">portfoliosite.com</a></li>
                  <li className="linkedin"><i className="fa fa-linkedin"></i><a href="#" target="_blank">linkedin.com/in/alandoe</a></li>
                  <li className="github"><i className="fa fa-github"></i><a href="#" target="_blank">github.com/username</a></li>
                  <li className="twitter"><i className="fa fa-twitter"></i><a href="https://twitter.com/3rdwave_themes" target="_blank">@twittername</a></li>
              </ul>
          </div>
          <div className="education-container container-block">
              <h2 className="container-block-title">Education</h2>
              <div className="item">
                  <h4 className="degree">MSc in Computer Science</h4>
                  <h5 className="meta">University of London</h5>
                  <div className="time">2011 - 2012</div>
              </div>
              <div className="item">
                  <h4 className="degree">BSc in Applied Mathematics</h4>
                  <h5 className="meta">Bristol University</h5>
                  <div className="time">2007 - 2011</div>
              </div>
          </div>

          <div className="languages-container container-block">
              <h2 className="container-block-title">Languages</h2>
              <ul className="list-unstyled interests-list">
                  <li>English <span className="lang-desc">(Native)</span></li>
                  <li>French <span className="lang-desc">(Professional)</span></li>
                  <li>Spanish <span className="lang-desc">(Professional)</span></li>
              </ul>
          </div>

          <div className="interests-container container-block">
              <h2 className="container-block-title">Interests</h2>
              <ul className="list-unstyled interests-list">
                  <li>Climbing</li>
                  <li>Snowboarding</li>
                  <li>Cooking</li>
              </ul>
          </div>

      </div>
    )
  }
}
export default SideBar;
