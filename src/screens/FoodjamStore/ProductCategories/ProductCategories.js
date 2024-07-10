import React, { useState } from 'react'
import './ProductCategories.css'
import placeholder from '../../../assets/imagespng/placeholder.png';
import { Link } from 'react-router-dom';
const ProductCategories = ({ variant, columns, heading, display_limit }) => {
    const [displayData, setDisplayData] = useState(columns.slice(0, display_limit));
    return (
        <div className="product-categories-section">
            <div className="product-categories-heading">
                {/* <img src={topCreators} alt="topCreators" className="topCreators-img" /> */}
                {heading}
                {/* 
        {columns?.length > display_limit && (
          <Button onClick={handleToggle} className="view-btn">
            {isExpanded ? 'View Less' : 'View All'}
          </Button>
        )} 
         */}
            </div>

            <div className="product-categories-container">
                {displayData.map((data, index) => (
                    <div key={index} className="product-categories-card-container">
                        <Link to={`/categories/${data.category_id}`} className='link-product-categories'>
                            <div className="product-categories-image-container">
                                <img
                                    className="product-categories-img"
                                    src={
                                        data?.image
                                            ? data.image.includes("http://")
                                                ? data?.image
                                                : `https://cdn.commeat.com/${data?.image}`
                                            : placeholder
                                    }
                                    alt={heading}
                                />
                            </div>
                        </Link>
                        <div className="product-categories-brand-title">{data?.name || 'etc.'}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductCategories