import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { fetchNewsContent } from '../../services/newsService';

import type { NewsContentData } from '../../utils/types';
import LoadingIndicator from '../LoadingIndicator';

const NewsContent = () => {
    const [newsContent, setNewsContent] = useState<NewsContentData | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const _location = useLocation();

    const { contentUrl } = _location.state;

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

    return (
        <>
            {isLoading
                ? <LoadingIndicator isOverlay />
                : <div>
                    {newsContent && (
                        <>
                            <h1>{newsContent?.title}</h1>
                            <div>
                                {newsContent.textContent}
                            </div>
                        </>
                    )}
                </div>
            }
        </>

    );
};

export default NewsContent;
