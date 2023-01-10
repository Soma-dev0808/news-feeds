import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux/app/hook";
import { newsContentAsyncActions, selectNewsContent } from "../redux/feature/newsContentSlice";
import { GetQueryParamsObj } from "../utils/types";

const useNewsContent = () => {
    const { isFetching, newsContent } = useAppSelector(selectNewsContent);
    const dispatch = useAppDispatch();

    const fetchNewsContent = useCallback((searchParamObj: GetQueryParamsObj) => {
        dispatch(newsContentAsyncActions.fetchNewsContent({ searchParamObj }));
    }, [dispatch]);

    return { isFetching, newsContent, fetchNewsContent };
};

export default useNewsContent;
