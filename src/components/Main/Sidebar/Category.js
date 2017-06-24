import React, { Component } from 'react';

class Category extends Component {
  render() {
    return(
      <div>
        <p id="title" className="foru">Danh mục được đề xuất</p>
        <ul className="special">
          <li><a href="/"><div className="block"><p id="special_post">Sự kiện Spiderum</p></div></a></li>
          <li><a href="/"><div className="block1"><p id="special_post">Phim</p></div></a></li>
          <li><a href="/"><div className="block2"><p id="special_post">Sách</p></div></a></li>
        </ul>
      </div>
    )
  }
}

export default Category;
