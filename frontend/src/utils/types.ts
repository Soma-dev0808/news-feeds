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

export type {
    Source,
    News,
    NewsFetchResult,
};