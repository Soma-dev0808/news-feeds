import React, { useState } from 'react';
import { fetchNews } from '../../services/newsService';
import { getToday } from '../../utils/utils';

import '../../styles/newsFeeds.scss';
import type { News } from '../../utils/types';
import NewsFeedsItem from './NewsFeedsItem';
import SearchForm from '../SearchForm';

const NewsFeedsList = () => {
    const [newsFeeds, setNewsFeeds] = useState<News[]>([]);

    const handleSearchClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const searchKeyword = e.currentTarget.searchKeyword.value;
        const dateFrom = e.currentTarget.dateFrom.value;

        const queryParamObj = {
            q: searchKeyword,
            from: dateFrom,
            sortBy: 'publishedAt',
            language: 'en',
        };

        fetchNews(queryParamObj).then(res => setNewsFeeds(res.articles));
    };

    console.log(newsFeeds);

    return (
        <div className='news-feed'>
            <div className='news-feed-search-form'>
                <SearchForm submitAction={handleSearchClick} />
            </div>
            <ul>
                {
                    newsFeeds.map((nf, idx) => (
                        <NewsFeedsItem
                            key={idx}
                            title={nf.title}
                            publishedAt={nf.publishedAt}
                            content={nf.content}
                            urlToImage={nf.urlToImage}
                        />
                    ))
                }
            </ul>
        </div>
    );
};

export default NewsFeedsList;
