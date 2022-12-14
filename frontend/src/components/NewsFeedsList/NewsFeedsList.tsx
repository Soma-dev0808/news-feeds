import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchNews } from '../../services/newsService';

import NewsFeedsItem from './NewsFeedsItem';
import SearchForm from '../SearchForm';
import LoadingIndicator from '../LoadingIndicator';
import type { GetQueryParamsObj, News } from '../../utils/types';

import '../../styles/newsFeeds.scss';

const NewsFeedsList = () => {
    const [newsFeeds, setNewsFeeds] = useState<News[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const _location = useLocation();
    const navigate = useNavigate();

    const { searchCond } = _location.state;

    useEffect(() => {
        if (searchCond && Object.keys(searchCond).length) {
            execNewsFetch(searchCond);
            navigate(_location.pathname, { replace: true, state: {} });
        }
    }, [searchCond]);


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

        execNewsFetch(queryParamObj);
    };

    const execNewsFetch = useCallback((searchParamObj: GetQueryParamsObj) => {
        setIsLoading(true);
        setIsSearchOpen(false);

        fetchNews(searchParamObj).then(res => {
            setNewsFeeds(res.articles);
            setIsLoading(false);
        });
    }, [isLoading, isSearchOpen, newsFeeds]);

    const handleSearchFormOpen = () => setIsSearchOpen(prev => !prev);

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
                    {!newsFeeds && (
                        <div className='news-feed-no-content'>
                            ↑ Fill a form and search news.
                        </div>
                    )}

                    {
                        newsFeeds && (
                            <>
                                {newsFeeds.length === 0 && (
                                    <div className='news-feed-no-content'>
                                        No Item Found
                                    </div>
                                )}

                                {newsFeeds.length > 0 && (
                                    <div className='news-feed-number-of-items'>
                                        <p>{newsFeeds.length} items found</p>
                                    </div>
                                )}


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
                        )
                    }
                </>
            }

        </div>
    );
};

export default NewsFeedsList;
