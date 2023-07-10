import React, { useState } from 'react';
import reviewCardStyle from '@/styles/ReviewsCard.module.css';
import Image from 'next/image';
import { BiLinkExternal } from 'react-icons/bi'

const Reviews = ({ data }) => {
const { review, images } = data;
const { author, author_details, content, url } = review;
const { name, username, avatar_path } = author_details;
const [showFullContent, setShowFullContent] = useState(false);

const toggleContent = () => {
setShowFullContent(!showFullContent);
};

return (
  <div className={reviewCardStyle.card}>
    <div className={reviewCardStyle.top}>
      <div className={reviewCardStyle.name}>
        <div className={reviewCardStyle.img}>
          {avatar_path && (
            <Image
              src={`${images.base_url}/original/${avatar_path}`}
              alt={`${name} PFP`}
              width={100}
              height={100}
            />
          )}
        </div>
        <div>
          <h3>{name || author}</h3>
          <span>@{username}</span>
        </div>
      </div>
            <a href={url}><BiLinkExternal className={reviewCardStyle.link} /></a>
    </div>
    {showFullContent ? <p>{content}</p> : <p>{content.slice(0, 250)}...</p>}
    {!showFullContent && <button onClick={toggleContent}>Read More</button>}
    {showFullContent && <button onClick={toggleContent}>Read Less</button>}
  </div>
);
};

export default Reviews;