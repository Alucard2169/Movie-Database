import reviewCardStyle from '@/styles/ReviewsCard.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import ReactMarkdown from 'react-markdown';

const Reviews = ({ data }) => {
  const { review, images } = data;

  const { author, author_details, content, url, id } = review;
  const { name, username, avatar_path } = author_details;
  const [expanded, setExpanded] = useState(false);

  const isLong = content.length > 400;
  const displayContent = expanded ? content : content.slice(0, 400);

  return (
    <div className={reviewCardStyle.card} key={id}>
      <div className={reviewCardStyle.top}>
        <div className={reviewCardStyle.name}>
          <div className={reviewCardStyle.img}>
            {avatar_path && (
              <Image
                src={`${images.base_url}/original/${avatar_path}`}
                alt={`${name || username} avatar`}
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
        <a href={url} target="_blank" rel="noopener noreferrer">
          <BiLinkExternal className={reviewCardStyle.link} />
        </a>
      </div>
      <div className={reviewCardStyle.content}>
        <ReactMarkdown>{displayContent + (!expanded && isLong ? '...' : '')}</ReactMarkdown>
        {isLong && (
          <button className={reviewCardStyle.toggle} onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Reviews;
