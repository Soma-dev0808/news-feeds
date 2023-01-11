import React from 'react';
import { News } from 'utils/types';

const NewsFeedListSubContents: React.FC<{ newsList: News[] | null; }> = ({ newsList }) => (
    <>
        {/* newsList is null */}
        {
            !newsList &&
            (
                <div className='news-feed-no-content'>
                    ↑ Fill a form and search news.
                </div>
            )
        }

        {/* newsList is empty */}
        {
            newsList?.length === 0 &&
            (
                <div className='news-feed-no-content'>
                    No Item Found
                </div>
            )
        }

        {/* newsList is not empty */}
        {
            newsList && newsList.length > 0 &&
            (
                <div className='news-feed-number-of-items'>
                    <p>{newsList.length} items found</p>
                </div>
            )
        }
    </>
);

export default React.memo(NewsFeedListSubContents);
