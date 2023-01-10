import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/app/hook';
import { selectNewsList, newsListReducerActions } from '../redux/feature/newsListSlice';

const useSearchFormOpen = () => {
    const dispatch = useAppDispatch();
    const { isSearchFormOpen } = useAppSelector(selectNewsList);

    const toggleSearchForm = useCallback((isOpen?: boolean) => {
        dispatch(newsListReducerActions.toggleSearchForm(isOpen));
    }, [dispatch]);

    return { isSearchFormOpen, toggleSearchForm };
};

export default useSearchFormOpen;
