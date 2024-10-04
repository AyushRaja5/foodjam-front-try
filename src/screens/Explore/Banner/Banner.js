import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import './Banner.css'

const Banner = ({ variant, columns, dataSource, heading, limit }) => {
  if (variant === 'static') {
    return (
      <div className='banner-section'>
        {/* <h3 className="explore-heading text-center" style={{ visibility: 'hidden' }}>
          {heading}
        </h3> */}
        <Carousel
            swipe = {true}
            IndicatorIcon = {false}
            autoPlay = {true}
            interval = {2000}
            animation = {'fade'}
            // stopAutoPlayOnHover = {true}
        >
          {columns.map((data, index) => (
            <div key={index} className="carousel-item">
              <img src={data.image} alt={data.title || 'Banner Image'} />
              <div className="banner-caption">
                <h4>{data.title}</h4>
                <p>{data.description}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
  return null;
};

export default Banner;
