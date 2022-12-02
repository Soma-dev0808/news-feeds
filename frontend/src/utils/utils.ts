interface GetQueryParamsObj {
    [key: string]: string;
}

const getQueryParams = (obj: GetQueryParamsObj): string => {
    return Object.keys(obj).reduce((prev: string[], key: string) => {
        return [...prev, `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`];
    }, []).join('&');
};

export {
    getQueryParams,
};