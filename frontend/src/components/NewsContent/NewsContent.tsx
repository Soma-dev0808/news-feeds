import React, { useEffect, useState } from 'react';
import { fetchNewsContent } from '../../services/newsService';

import type { NewsContentData } from '../../utils/types';

const NewsContent = () => {
    const [newsContent, setNewsContent] = useState<NewsContentData | null>();

    useEffect(() => {
        fetchNewsContent()
            .then(res => {
                setNewsContent(res.newsContent);
            });
    }, []);

    return (
        <div>
            {newsContent && (
                <>
                    <h1>{newsContent?.title}</h1>
                    <div>
                        {newsContent.textContent}
                    </div>
                </>
            )}
        </div>
    );
};

export default NewsContent;
