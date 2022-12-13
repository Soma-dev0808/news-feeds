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
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

    const handleSearchClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const searchKeyword = e.currentTarget.searchKeyword.value;
        const dateFrom = e.currentTarget.dateFrom.value;
        const sortBy = e.currentTarget.sortBy.value;

        const queryParamObj = {
            q: searchKeyword,
            from: dateFrom,
            sortBy: sortBy,
            language: 'en',
        };

        setIsLoading(true);
        setIsSearchOpen(false);

        fetchNews(queryParamObj).then(res => {
            setNewsFeeds(res.articles);
            setIsLoading(false);
        });
    };

    const handleSearchFormOpen = () => {
        setIsSearchOpen(prev => !prev);
    };

    return (
        <div className='news-feed'>
            <div className={`news-feed-search-form ${isSearchOpen && 'formactive'}`}>
                <button
                    type='button'
                    className='news-feed-search-form-closeBtn'
                    onClick={handleSearchFormOpen}
                >
                    X
                </button>
                <SearchForm submitAction={handleSearchClick} />
            </div>

            <button
                type='button'
                className='news-feed-search-form-searchBtn'
                onClick={handleSearchFormOpen}
            >
                search
            </button>

            {isLoading
                ? <LoadingIndicator isOverlay={false} />
                : <>
                    {
                        newsFeeds.length > 0 && (
                            <div className='news-feed-number-of-items'>
                                <p>{newsFeeds.length} items found</p>
                            </div>
                        )
                    }
                    <ul className='news-feed-list'>
                        {
                            newsFeeds.map((nf, idx) => (
                                <NewsFeedsItem
                                    key={idx}
                                    {...nf}
                                />
                            ))
                        }
                    </ul>
                </>
            }

        </div>
    );
};

export default NewsFeedsList;
