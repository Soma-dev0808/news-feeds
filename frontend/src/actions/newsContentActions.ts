import { AppDispatch } from "../redux/app/configureStore";
import { fetchNewsContent } from "../redux/feature/newsContentSlice";

import type { GetQueryParamsObj } from "../utils/types";

const handleFetchNewsContent = (searchParamObj: GetQueryParamsObj) => {
    return async (dispatch: AppDispatch) => {
        dispatch(fetchNewsContent({ searchParamObj }));
    };
};

export {
    handleFetchNewsContent
};