import { AppDispatch } from "../app/configureStore";
import { fetchNewsList } from "../feature/newsListSlice";

import type { GetQueryParamsObj } from "../utils/types";

const handleFetchNewsList = (searchParamObj: GetQueryParamsObj) => {
    return async (dispatch: AppDispatch) => {
        dispatch(fetchNewsList({ searchParamObj }));
    };
};

export {
    handleFetchNewsList
};