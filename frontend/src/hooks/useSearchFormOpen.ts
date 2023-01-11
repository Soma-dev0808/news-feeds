import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/app/hook';
import { selectNewsList, newsListReducerActions } from 'redux/feature/newsListSlice';

const useSearchFormOpen = () => {
    const dispatch = useAppDispatch();
    const { isSearchFormOpen } = useAppSelector(selectNewsList);

    const toggleSearchForm = useCallback(() => {
        dispatch(newsListReducerActions.toggleSearchForm());
    }, [dispatch]);

    return { isSearchFormOpen, toggleSearchForm };
};

export default useSearchFormOpen;
