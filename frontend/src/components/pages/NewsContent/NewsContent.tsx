import React, { useEffect, useMemo } from 'react';
import { useLocation } from "react-router-dom";
import useNewsContent from 'hooks/useNewsContent';

import LoadingIndicator from 'components/ui/LoadingIndicator';
import { getFirstPhrase } from 'utils/utils';

interface NewsContentProps { }

const NewsContent: React.FC<NewsContentProps> = () => {
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

    return (
        <>
            {isFetching
                ? <LoadingIndicator isOverlay />
                : <>
                    {
                        newsContent && (
                            <div className='news-content'>
                                <h1>{newsContent.title}</h1>
                                <h3>{newsContent.siteName}</h3>
                                <p>{publishedAt}</p>
                                <img
                                    src={contentImgUrl}
                                    alt="new image"
                                    className='news-content-img'
                                />
                                <p className='news-content-text'>
                                    <span className='news-content-firstphrase'>{firstPhrase}</span>
                                    {content}
                                </p>
                            </div>
                        )
                    }
                </>
            }
        </>

    );
};

export default NewsContent;
