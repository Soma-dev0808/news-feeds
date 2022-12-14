import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from "react-router-dom";
import { fetchNewsContent } from '../../services/newsService';

import type { NewsContentData } from '../../utils/types';
import LoadingIndicator from '../LoadingIndicator';

import '../../styles/newsContent.scss';

const NewsContent = () => {
    const [newsContent, setNewsContent] = useState<NewsContentData | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const _location = useLocation();

    const { contentUrl, contentImgUrl, publishedAt } = _location.state;

    useEffect(() => {
        if (!contentUrl) return;
        const newContentObj = {
            contentUrl,
        };

        setIsLoading(true);
        fetchNewsContent(newContentObj)
            .then(res => {
                setNewsContent(res.newsContent);
                setIsLoading(false);
            }).catch();
    }, []);

    if (!contentUrl) (<div> Something wrong with loading content..... </div>);

    // get first string of text content
    const [firstPhrase, content] = useMemo(() => {
        if (!newsContent) return [];
        const _firstPhrase = newsContent.textContent.split(' ')[0];
        return [_firstPhrase, newsContent.textContent.replace(_firstPhrase, '')];
    }, [newsContent]);

    return (
        <>
            {isLoading
                ? <LoadingIndicator isOverlay />
                : <div className='news-content'>
                    {newsContent && (
                        <>
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
                        </>
                    )}
                </div>
            }
        </>

    );
};

export default NewsContent;
