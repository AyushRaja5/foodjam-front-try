import React, { useEffect, useState } from "react";
import { getPostByResourceId } from "../../../services/Explore/ExploreService"; // Ensure the path is correct
// import VideoPlayerModal from "../../../GenericComponent/Modals/VideoPlayerModal";
import wishlist from '../../../assets/imagespng/wishlist.png'
import './Curation.css'
const BUCKET_URL = "https://cdn.commeat.com/";

const Curation = ({ heading, columns }) => {
  const displayLimit = 4;
  const [displayData, setDisplayData] = useState(columns.slice(0, displayLimit));
  const [resourceId, setResourceId] = useState(null);
  const [show, setShow] = useState(false);
  const [src, setSrc] = useState("");
  const [poster, setPoster] = useState("");

  useEffect(() => {
    setDisplayData(columns.slice(0, displayLimit));
  }, [columns]);

  useEffect(() => {
    const fetchVideoData = async () => {
      if (resourceId) {
        try {
          const data = await getPostByResourceId(resourceId);
          if (data) {
            const { media, thumbnail } = data.data;
            setSrc(`${BUCKET_URL}${media}`);
            setPoster(`${BUCKET_URL}${thumbnail}`);
            setShow(true);
          }
        } catch (error) {
          console.log("Something went wrong ", error);
        }
      }
    };

    fetchVideoData();
  }, [resourceId]);

  const playVideo = (id) => {
    if (id === resourceId) {
      setShow(true);
    } else {
      setResourceId(id);
    }
  };

  return (
    <div className="explore-user-section" >

      <div className="explore-curation-heading">
        <img src={wishlist} alt="wishlist" className="wishlist-img" />
        {heading}
      </div>

      <div className="curation-conatiner">
        {displayData.map((data, index) => (
          <div key={index} className="curation-card" onClick={() => playVideo(data.resource)}>
            <img
              src={data.image?.includes("https://") ? data.image : `${BUCKET_URL}${data.image}`}
              alt={heading}
              className="curation-card-img" 
            />
            <div className="curation-text-wrapper">
              <p className="curation-text">{data.title}</p>
            </div>
          </div>
        ))}
      </div>
      {/* {columns.length > displayData.length && (
        <div className="view-btn d-flex justify-content-center" style={{ marginTop: "25px" }}>
          <button onClick={() => setDisplayData(columns)}>View All</button>
        </div>
      )} */}
      {/* <VideoPlayerModal show={show} setShow={setShow} src={show ? src : ""} poster={show ? poster : ""} /> */}
    </div>
  );
};

export default Curation;
