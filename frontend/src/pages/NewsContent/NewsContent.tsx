import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from "react-router-dom";
import { fetchNewsContent } from '../../services/newsService';

import LoadingIndicator from '../../components/LoadingIndicator';

import '../../styles/newsContent.scss';
import type { NewsContentData } from '../../utils/types';
import type { GenericCommonActionType } from '../../app/configureStore';

interface NewsContentProps {
    isFetching: boolean;
    newsContent: NewsContentData | null;
    fetchNewsContentAction: GenericCommonActionType;
}

const NewsContent: React.FC<NewsContentProps> = ({
    isFetching,
    newsContent,
    fetchNewsContentAction,
}) => {
    const _location = useLocation();
    const { contentUrl, contentImgUrl, publishedAt } = _location.state;

    useEffect(() => {
        if (!contentUrl) return;
        fetchNewsContentAction({ contentUrl });
    }, []);

    // get first string of text content
    const [firstPhrase, content] = useMemo(() => {
        if (!newsContent) return [];
        const _firstPhrase = newsContent.textContent.split(' ')[0];
        return [_firstPhrase, newsContent.textContent.replace(_firstPhrase, '')];
    }, [newsContent]);

    if (!contentUrl) return (<div> Something wrong with loading content..... </div>);

    return (
        <>
            {isFetching
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
