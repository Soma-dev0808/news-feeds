import { AppDispatch } from "../app/configureStore";
import { fetchNewsContent } from "../feature/newsContentSlice";

import type { GetQueryParamsObj } from "../utils/types";

const handleFetchNewsContent = (searchParamObj: GetQueryParamsObj) => {
    return async (dispatch: AppDispatch) => {
        dispatch(fetchNewsContent({ searchParamObj }));
    };
};

export {
    handleFetchNewsContent
};