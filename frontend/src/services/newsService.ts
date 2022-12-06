import { getQueryParams } from "../utils/utils";

import type {
    GetQueryParamsObj,
    NewsContentResult,
    NewsFetchResult
} from "../utils/types";

const mockNewsFeeds = () => new Promise<NewsFetchResult>((res) => setTimeout(() => {
    res({
        status: 'ok',
        articles: [],
        totalResults: 0,
    });
}, 500));

const fetchNews = async (queryObj: GetQueryParamsObj) => {

    const queryPrameters = getQueryParams(queryObj);

    console.log(queryPrameters);

    // POST for fetch
    // const res = await fetch(`${import.meta.env.VITE_NEWS_APIURI}?${queryPrameters}`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(queryParamObj)
    // })
    //     .then(res => res.json());

    const res: NewsFetchResult = await fetch(`${import.meta.env.VITE_NODEJS_SERVER}/news-feeds?${queryPrameters}`)
        .then(res => (res.json()))
        .catch(_ => { throw new Error('Error with news feed fetching'); });

    if (res.status === 'ok') {
        return res;
    }

    throw new Error('Error with news feed fetching');
};

const fetchNewsContent = async () => {
    const res: NewsContentResult = await fetch(`${import.meta.env.VITE_NODEJS_SERVER}/news-feeds/content`)
        .then(res => res.json());

    console.log(res);

    if (res.status === 'ok') {
        return res;
    }

    throw new Error('Error with news feed fetching');
};

export {
    fetchNews,
    fetchNewsContent
};