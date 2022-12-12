import React, { useState } from 'react';
import { fetchNews } from '../../services/newsService';

import type { News } from '../../utils/types';
import NewsFeedsItem from './NewsFeedsItem';
import SearchForm from '../SearchForm';
import LoadingIndicator from '../LoadingIndicator';

import '../../styles/newsFeeds.scss';

const NewsFeedsList = () => {
    const [newsFeeds, setNewsFeeds] = useState<News[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

        setIsLoading(true);
        fetchNews(queryParamObj).then(res => {
            setNewsFeeds(res.articles);
            setIsLoading(false);
        });
    };

    return (
        <div className='news-feed'>
            <div className='news-feed-search-form'>
                <SearchForm submitAction={handleSearchClick} />
            </div>

            {isLoading
                ? <LoadingIndicator isOverlay={false} />
                : <ul className='news-feed-list'>
                    {
                        newsFeeds.map((nf, idx) => (
                            <NewsFeedsItem
                                key={idx}
                                {...nf}
                            />
                        ))
                    }
                </ul>
            }

        </div>
    );
};

export default NewsFeedsList;
