import React, { useEffect, useMemo } from 'react';
import { useLocation } from "react-router-dom";
import useNewsContent from 'hooks/useNewsContent';

import LoadingIndicator from 'components/ui/LoadingIndicator';
import { getFirstPhrase } from 'utils/utils';
import { NewsContentData } from 'utils/types';

interface NewsContentProps {
    newsContent: NewsContentData;
    publishedAt: string;
    contentImgUrl: string;
    firstPhrase: string;
    content: string;
}

interface NewsContentContainerProps { }

const NewsContent: React.FC<NewsContentProps> = ({
    newsContent: { title, siteName },
    publishedAt,
    contentImgUrl,
    firstPhrase,
    content
}) => (
    <div className='news-content'>
        <h1>{title}</h1>
        <h3>{siteName}</h3>
        <p>{publishedAt}</p>
        <img
            src={contentImgUrl}
            alt="new image"
            className='news-content-img'
        />
        <p className='news-content-text'>
            <span className='news-content-firstphrase'>
                {firstPhrase}
            </span>
            {content}
        </p>
    </div>
);


const NewsContentContainer: React.FC<NewsContentContainerProps> = () => {
    const _location = useLocation();
    const { contentUrl, contentImgUrl, publishedAt } = _location.state;
    const { isFetching, newsContent, fetchNewsContent } = useNewsContent();
    // get first string of text content
    const [firstPhrase, content] = useMemo(() => getFirstPhrase(newsContent), [newsContent]);

    useEffect(() => {
        if (!contentUrl) return;
        fetchNewsContent({ contentUrl });
    }, []);

    if (!contentUrl) return (<div> Something wrong with loading content..... </div>);

    if (isFetching) return <LoadingIndicator isOverlay />;

    if (!newsContent) return null;

    return <NewsContent
        newsContent={newsContent}
        publishedAt={publishedAt}
        contentImgUrl={contentImgUrl}
        firstPhrase={firstPhrase}
        content={content}
    />;
};

export default NewsContentContainer;
