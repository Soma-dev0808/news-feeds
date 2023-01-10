import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/app/hook';
import { newsListReducerActions, selectNewsList } from 'redux/feature/newsListSlice';
import { GetQueryParamsObj } from 'utils/types';

const useNewsFeed = () => {
    const { isFetching, newsList } = useAppSelector(selectNewsList);
    const dispatch = useAppDispatch();

    const fetchNewsList = useCallback(
        (searchParamObj: GetQueryParamsObj) => {
            dispatch(newsListReducerActions.fetchNewsList({ searchParamObj }));
        }, [dispatch]);


    return { isFetching, newsList, fetchNewsList };
};

export default useNewsFeed;
