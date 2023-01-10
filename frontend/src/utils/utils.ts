import type { GetQueryParamsObj, NewsContentData, NewsFetchResult } from "./types";

const getQueryParams = (obj: GetQueryParamsObj): string => {
    return Object.keys(obj).reduce((prev: string[], key: string) => {
        return [...prev, `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`];
    }, []).join('&');
};

const getToday = (isLastMonth = false): string => {
    var date = new Date();
    // d.setMonth(d.getMonth() - 1);
    // return d.toLocaleDateString();

    let day: string | number = date.getDate();
    let month: string | number = date.getMonth() + 1;
    let year = date.getFullYear();

    if (isLastMonth) {
        const isJanuary = checkIsJanuary(month);
        month = isJanuary ? 12 : month - 1;
        year = isJanuary ? year - 1 : year;
    };

    if (day < 10) day = `0${day}`;
    if (month < 10) month = `0${month}`;

    return `${year}-${month}-${day}`;
};

const checkIsJanuary = (month: number): boolean => month === 1;

const timeModifier = (timeTomodify?: string): string => {
    if (!timeTomodify) return '';
    return timeTomodify.replace('T', ' ').replace('Z', '');
};

const removeContentCharInfo = (content?: string): string => {
    if (!content) return '';
    const str = /\[\+\d*\schars\]/;
    return content.replace(str, '');
};

const getFirstPhrase = (newsContent: NewsContentData | null) => {
    if (!newsContent) return [];
    const _firstPhrase = newsContent.textContent.split(' ')[0];
    return [_firstPhrase, newsContent.textContent.replace(_firstPhrase, '')];
};

// helper for mocking news feed api
const mockNewsFeeds = () => new Promise<NewsFetchResult>((res) => setTimeout(() => {
    res({
        status: 'ok',
        articles: [],
        totalResults: 0,
    });
}, 500));

export {
    getQueryParams,
    getToday,
    timeModifier,
    removeContentCharInfo,
    getFirstPhrase
};