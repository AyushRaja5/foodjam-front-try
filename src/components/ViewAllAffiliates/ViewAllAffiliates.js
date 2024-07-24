import React from 'react'
import './ViewAllAffiliates.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';// Adjust the path as needed
import {Typography, Breadcrumbs } from '@mui/material';
const ViewAllAffiliates = () => {
    const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const BUCKET_URL = "https://cdn.commeat.com/";
  const { affiliateArray } = location.state || { affiliateArray: [] };
    return (
        <div className="view-all-affiliate-container">
            <Breadcrumbs separator="›"  aria-label="breadcrumb">
                <Link underline="hover" style={{ textDecoration: 'none', color: 'inherit' }} to="/explore">
                Explore
                </Link>
                <Typography color="text.primary">View All Affiliates</Typography>
            </Breadcrumbs>
            <br/>

            <div className="view-all-affiliate">
            {affiliateArray?.map((data) => (
                <div key={data.id} className="affiliate-div">
                    <div className="affiliate-card" onClick={() => window.open(data?.url, '_blank', 'noopener,noreferrer')}>
                        <img src={`${BUCKET_URL + data.image}`} alt={data.name} className="affiliate-img" />
                    </div>
                    <div className="affiliate-text">{data.name}</div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default ViewAllAffiliates