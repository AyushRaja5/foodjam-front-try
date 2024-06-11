import React from "react";
import './Brand.css'
import wishlist from '../../../assets/imagespng/wishlist.png'
import { Link } from "react-router-dom";
const Brand = ({ variant, heading, columns, dataSource, limit }) => {
  return (
    <div className="explore-user-section" >

      <div className="explore-curation-heading">
        {/* <img src={wishlist} alt="wishlist" className="wishlist-img" /> */}
        {heading}
      </div>

      <div className="explore-brands-container">
        {columns.map((data, index) => (
          <div key={index} className="explore-brand-card">
            <img
              src={
                data.image?.includes("https://")
                  ? data.image
                  : `https://cdn.commeat.com/${data.image}`
              }
              alt={heading}
              className="explore-brand-img"
            />
            <div className="explore-brand-text-wrapper">
              {/* <p className="explore-brand-text">{data.title}</p> */}
              <Link to={`/brand/${data?.resource}`} className='link-user-profile'>
                <button>View Brands</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Brand;
