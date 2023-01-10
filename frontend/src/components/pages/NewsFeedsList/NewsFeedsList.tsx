import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useNewsFeed from '../../../hooks/useNewsFeed';
import useSearchFormOpen from '../../../hooks/useSearchFormOpen';

import LoadingIndicator from '../../ui/LoadingIndicator';
import NewsFeedsItem from '../../models/newsFeedList/NewsFeedsItem';
import SearchForm from '../../models/search/SearchForm';
import NewsFeedListSubContents from '../../models/newsFeedList/NewsFeedListSubs';
import { SearchFormCloseButton, SearchFormOpenButton } from '../../models/newsFeedList/NewsFeedListButtons';
import { removeContentCharInfo, timeModifier } from '../../../utils/utils';

import type { GetQueryParamsObj } from '../../../utils/types';
import '../../../styles/newsFeeds.scss';

interface NewsFeedsListProps { }

const NewsFeedsList: React.FC<NewsFeedsListProps> = () => {
    const _location = useLocation();
    const navigate = useNavigate();
    const { isSearchFormOpen, toggleSearchForm } = useSearchFormOpen();
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
        toggleSearchForm(false);
        fetchNewsList(searchParamObj);
    }, [isSearchFormOpen]);

    const handleSearchFormOpen = () => toggleSearchForm();

    return (
        <div className='news-feed'>
            <div className={`news-feed-search-form ${isSearchFormOpen && 'formactive'}`}>
                <SearchFormCloseButton handleSearchFormOpen={handleSearchFormOpen} />
                <SearchForm submitAction={handleSearchClick} />
            </div>

            <SearchFormOpenButton handleSearchFormOpen={handleSearchFormOpen} />

            {isFetching
                ? <LoadingIndicator isOverlay={false} />
                : <>
                    <NewsFeedListSubContents newsList={newsList} />
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
