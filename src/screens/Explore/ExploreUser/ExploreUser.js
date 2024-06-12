import React from "react";
import { Card, CardContent, CardMedia, Grid, Button } from "@mui/material";
import './ExploreUser.css';
import topCreators from '../../../assets/imagespng/topCreators.png'
import { Link } from "react-router-dom";
const ExploreUser = ({ variant, columns, dataSource, heading, limit }) => {
  return (
    <div className="explore-user-section" >
      {columns.length > 0 && (
        <div className="explore-user-heading">
          <img src={topCreators} alt="topCreators" className="topCreators-img"/>
          {heading}
        </div>
      )}
      <div className="videos-conatiner">
        {columns.slice(0, limit).map((data, index) => (
          <Grid item key={index}>
            <Link to={`/profile/${data?.account_id}/2`} className='link-user-profile'>
            <Card className="user-card">
              <img
                className="user-img"
                src={
                  data?.profile_picture
                    ? data.profile_picture.includes("https://")
                      ? data?.profile_picture
                      : `https://cdn.commeat.com/${data?.profile_picture}`
                    : ""
                }
                alt={heading}
              />
                <div className="user-text">
                  {`${data.username}`}
                </div>
                <Button className="user-follow-btn">
                    Follow
                </Button>
            </Card>
            </Link>
          </Grid>
        ))}
      </div>
    </div>
  );
};

export default ExploreUser;
