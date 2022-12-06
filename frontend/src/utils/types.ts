interface FetchResult {
    status: string;
}

interface Source {
    id: number;
    name: string;
}

interface News {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: Source;
    title: string;
    url: string;
    urlToImage: string;
}

interface NewsFetchResult extends FetchResult {
    articles: News[];
    totalResults: number;
}

interface NewsContentData {
    title: string;
    byline: string;
    dir: string;
    content: string;
    textContent: string;
    length: number;
    excerpt: string;
    siteName: string;
}

interface NewsContentResult extends FetchResult {
    newsContent: NewsContentData | null;
}

interface GetQueryParamsObj {
    [key: string]: string;
}

export type {
    Source,
    News,
    NewsFetchResult,
    NewsContentData,
    NewsContentResult,
    GetQueryParamsObj
};