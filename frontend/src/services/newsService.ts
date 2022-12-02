import { getQueryParams } from "../utils/utils";

import type { NewsFetchResult } from "../utils/types";

const fetchNews = async () => {
    const queryParamObj = {
        q: 'tesla',
        from: '2022-11-02',
        sortBy: 'publishedAt',
        apiKey: import.meta.env.VITE_NEWS_APIKEY,
    };

    const queryPrameters = getQueryParams(queryParamObj);

    // POST for fetch
    // const res = await fetch(`${import.meta.env.VITE_NEWS_APIURI}?${queryPrameters}`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(queryParamObj)
    // })
    //     .then(res => res.json());

    const res: NewsFetchResult = await fetch(`${import.meta.env.VITE_NEWS_APIURI}?${queryPrameters}`)
        .then(res => (res.json()))
        .catch(_ => { throw new Error('Error with news feed fetching'); });

    if (res.status === 'ok') {
        return res;
    }

    throw new Error('Error with news feed fetching');
};

export {
    fetchNews
};