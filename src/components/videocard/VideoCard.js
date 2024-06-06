import React from 'react';
import './VideoCard.css';
import eye from '../../assets/imagessvg/eye.svg'
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
        <span className='bottom-center-text'>
          <div className='pp-username'>
            <img 
            src={ post.profile_picture?.startsWith('https://')
                ? post.profile_picture
                : cdnBaseURL + post.profile_picture} 
            className='video-card-profile-pic' />
            {post.username}
          </div>
          <div>{truncateText(post.text, 50)}</div>
        </span>
      </div>
    </div>
  );
};

export default VideoCard;
