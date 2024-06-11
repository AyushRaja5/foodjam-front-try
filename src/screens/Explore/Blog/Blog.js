import React from "react";
import './Blog.css'
import wishlist from '../../../assets/imagespng/wishlist.png'
const Blog = ({ variant, heading, columns, dataSource, limit }) => {
  return (
    <div className="explore-user-section" >

      <div className="explore-curation-heading">
        <img src={wishlist} alt="wishlist" className="wishlist-img" />
        {heading}
      </div>

      <div className="blogs">
        {columns.map((data, index) => (
          <div key={index} className="blog-container">
            <img
              src={
                data.image?.includes("https://")
                  ? data.image
                  : `https://cdn.commeat.com/${data.image}`
              }
              alt={heading}
              className="blog-img"
            />
            <div className="blog-text-wrapper">
              <p className="blog-text">{data.title}</p>
              <a href={data.url} target="_blank">
                <button>Read More</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Blog;
