import React from 'react';
import { Link } from "react-router-dom";

import type { News } from '../../../../utils/types';

const NewsFeedsItem: React.FC<Partial<News>> = ({
    title,
    publishedAt,
    content,
    urlToImage,
    url
}) => {
    return (
        <li className='news-feed-item'>
            <Link
                to={`/news/content`}
                className="news-feed-item-link"
                state={{
                    contentUrl: url,
                    contentImgUrl: urlToImage,
                    publishedAt,
                }}
            >
                <div>
                    <h2>{title}</h2>
                    <p>{publishedAt}</p>
                    <p>{content}</p>
                </div>

                <figure className='news-feed-item-image-container'>
                    <img
                        src={urlToImage}
                        alt="new image"
                        className='news-feed-item-image'
                    />
                </figure>
            </Link>
        </li>
    );
};

export default NewsFeedsItem;
