import React, { useEffect, useState } from 'react';
import { fetchNews } from '../services/newsService';

import type { News } from '../utils/types';

const NewsFeedsList = () => {
    const [newsFeeds, setNewsFeeds] = useState<News[]>([]);

    useEffect(() => {
        if (!newsFeeds.length) {
            fetchNews()
                .then(res => setNewsFeeds(res.articles));
        }
    }, []);

    return (
        <div>
            <ul>
                {
                    newsFeeds.map((nf, idx) => (
                        <li key={idx}>
                            <h2>{nf.title}</h2>
                            <p>{nf.publishedAt}</p>
                            <p>{nf.content}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default NewsFeedsList;
