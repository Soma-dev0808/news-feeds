import type { GetQueryParamsObj } from "./types";

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
    if (isLastMonth) month = monthMinusOne(month);
    let year = date.getFullYear();

    if (day < 10) day = `0${day}`;
    if (month < 10) month = `0${month}`;

    return `${year}-${month}-${day}`;
};

const monthMinusOne = (month: number): number => {
    if (month === 1) {
        return 12;
    }

    return month - 1;
};

export {
    getQueryParams,
    getToday,
};