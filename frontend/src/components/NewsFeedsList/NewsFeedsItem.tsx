import React from 'react';

import type { News } from '../../utils/types';


const NewsFeedsItem: React.FC<Partial<News>> = ({
    title,
    publishedAt,
    content,
    urlToImage
}) => {
    return (
        <li className='news-feed-item'>
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
        </li>
    );
};

export default NewsFeedsItem;
