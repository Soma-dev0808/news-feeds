import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import NewsFeedsItem from '../../components/NewsFeedsItem';
import SearchForm from '../../components/SearchForm';
import LoadingIndicator from '../../components/LoadingIndicator';
import { removeContentCharInfo, timeModifier } from '../../utils/utils';
import useNewsFeed from '../../hooks/useNewsFeed';

import type { GetQueryParamsObj } from '../../utils/types';
import '../../styles/newsFeeds.scss';

interface NewsFeedsListProps { }

const NewsFeedsList: React.FC<NewsFeedsListProps> = () => {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const _location = useLocation();
    const navigate = useNavigate();
    const { isFetching, newsList, fetchNewsList } = useNewsFeed();

    const searchCond = _location?.state?.searchCond;

    useEffect(() => {
        // clear _location.state
        if (searchCond && Object.keys(searchCond).length) {
            execNewsFetch(searchCond);
            navigate(_location.pathname, { replace: true, state: {} });
        }
    }, [searchCond]);


    const handleSearchClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        execNewsFetch({
            q: e.currentTarget.searchKeyword.value,
            from: e.currentTarget.dateFrom.value,
            sortBy: e.currentTarget.sortBy.value,
            language: 'en',
        });
    };

    const execNewsFetch = useCallback((searchParamObj: GetQueryParamsObj) => {
        setIsSearchOpen(false);
        fetchNewsList(searchParamObj);
    }, [isSearchOpen]);

    const handleSearchFormOpen = () => setIsSearchOpen(prev => !prev);

    const renderSearchInstruction = () => {
        return !newsList
            ? (
                <div className='news-feed-no-content'>
                    ↑ Fill a form and search news.
                </div>
            )
            : null;
    };

    const renderNoItemFound = () => {
        return newsList?.length === 0
            ? (
                <div className='news-feed-no-content'>
                    No Item Found
                </div>
            )
            : null;
    };

    const renderNumberOfItem = () => {
        return newsList && newsList.length > 0
            ? (
                <div className='news-feed-number-of-items'>
                    <p>{newsList.length} items found</p>
                </div>
            )
            : null;
    };

    const searchInstruction = renderSearchInstruction();
    const noItemFound = renderNoItemFound();
    const numberOfItems = renderNumberOfItem();

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

            {isFetching
                ? <LoadingIndicator isOverlay={false} />
                : <>
                    {searchInstruction}
                    {noItemFound}
                    {numberOfItems}
                    <ul className='news-feed-list'>
                        {
                            newsList?.map((nf, idx) => (
                                <NewsFeedsItem
                                    key={idx}
                                    {...nf}
                                    publishedAt={timeModifier(nf.publishedAt)}
                                    content={removeContentCharInfo(nf.content)}
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
