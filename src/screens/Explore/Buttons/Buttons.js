import React from 'react';
import { Link } from 'react-router-dom';
import './Buttons.css'; // Import your CSS file here if you have styling
import contestImg from '../../../assets/imagespng/contests.png';
import rewardsImg from '../../../assets/imagespng/rewards.png';
import workshopImg from '../../../assets/imagespng/workshops.png';
import trendingImg from '../../../assets/imagespng/trending.png';
import wishlist from '../../../assets/imagespng/wishlist.png';

const ButtonsCard = ({ columns, heading }) => {
  return (
    <div className="explore-user-section">
      <div className="explore-curation-heading">
        <div style={{display:'flex', alignItems:'center', gap:'20px', fontWeight:'600'}}>
          <img src={wishlist} alt="wishlist" className="wishlist-img" />
          {'Explore More'}
        </div>
      </div>

      <div className="buttons-card-section">
        {columns?.map((item, index) => {
          const route = index === 0 ? '/contests' :
                        index === 1 ? '/rewards':
                        index === 2 ? '/workshops' :
                        index === 3 ? '/campaigns' : '/';

          return (
            <Link to={route} key={index} className='link-user-profile'>
              <div
                className={`button-container ${
                  index === 1 ? 'background-pink' : 
                  index === 2 ? 'background-green' : 
                  index === 3 ? 'background-purple' : ''
                }`}
              >
                <span className={`button-text ${
                  index === 1 ? 'text-pink' : 
                  index === 2 ? 'text-green' : 
                  index === 3 ? 'text-purple' : ''
                }`}>
                  {item.button_text || 'Contests'}
                </span>
                {index === 0 && (
                  <img
                    className="button-image contests"
                    src={contestImg}
                    alt="Contests"
                  />
                )}
                {index === 1 && (
                  <img
                    className="button-image workshops"
                    src={workshopImg}
                    alt="Workshops"
                  />
                )}
                {index === 2 && (
                  <img
                    className="button-image rewards"
                    src={rewardsImg}
                    alt="Rewards"
                  />
                )}
                {index === 3 && (
                  <img
                    className="button-image trending"
                    src={trendingImg}
                    alt="Trending"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ButtonsCard;
