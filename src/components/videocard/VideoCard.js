import React from 'react';
import './VideoCard.css';
import eye from '../../assets/imagessvg/eye.svg'
import userPlaceholder from '../../assets/imagespng/user.png'
import PlayImg from '../../assets/imagespng/playHome.png'
import { Link } from 'react-router-dom';
const VideoCard = ({ post }) => {
  const cdnBaseURL = 'https://cdn.commeat.com/';
  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  return (
    <div className='video-card-container'>
      <img src={`${cdnBaseURL}${post.thumbnail}`} alt='Video Thumbnail' className='video-thumbnail' />
      <div className='overlay'>
        <span className='top-right-text'>
          <img src={eye} />
          <span>
            {post.total_views || 0}
          </span>
        </span>
        <img src={PlayImg} alt='Play Button' className='play-button' />
        <span className='bottom-center-text'>
        <Link to={`/profile/${post?.account_id}/3`} className='link-user-profile'>
          <div className='pp-username'>
            <img 
            src={
              post?.profile_picture
                ? post.profile_picture.includes("https://")
                  ? post?.profile_picture
                  : `https://cdn.commeat.com/${post?.profile_picture}`
                : userPlaceholder
            }
            className='video-card-profile-pic' />
            {post.username}
          </div>
          </Link>
          <div>{truncateText(post.text, 50)}</div>
        </span>
      </div>
    </div>
  );
};

export default VideoCard;
