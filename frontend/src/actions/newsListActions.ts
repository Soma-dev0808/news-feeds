import { AppDispatch } from "../redux/app/configureStore";
import { newsListAsyncActions } from "../redux/feature/newsListSlice";

import type { GetQueryParamsObj } from "../utils/types";

const handleFetchNewsList = (searchParamObj: GetQueryParamsObj) => {
    return async (dispatch: AppDispatch) => {
        dispatch(newsListAsyncActions.fetchNewsList({ searchParamObj }));
    };
};

export {
    handleFetchNewsList
};