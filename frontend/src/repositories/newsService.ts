import { getQueryParams } from "../utils/utils";

import type {
    GetQueryParamsObj,
    NewsContentResult,
    NewsFetchResult
} from "../utils/types";

const fetchNews = async (queryObj: GetQueryParamsObj) => {

    const queryPrameters = getQueryParams(queryObj);

    const res: NewsFetchResult = await fetch(`${import.meta.env.VITE_NODEJS_SERVER}/news-feeds?${queryPrameters}`)
        .then(res => (res.json()))
        .catch(_ => { throw new Error('Error with news feed fetching'); });

    if (res.status !== 'ok') {
        throw new Error('Error with news feed fetching');
    }

    return res;
};

const fetchNewsContent = async (queryObj: GetQueryParamsObj) => {
    const queryPrameters = getQueryParams(queryObj);

    const res: NewsContentResult = await fetch(`${import.meta.env.VITE_NODEJS_SERVER}/news-feeds/content?${queryPrameters}`)
        .then(res => res.json())
        .catch(_ => { throw new Error('Error with news content fetching'); });

    if (res.status !== 'ok') {
        throw new Error('Error with news feed fetching');
    }

    return res;
};

export const newsImpl = {
    fetchNews,
    fetchNewsContent
};