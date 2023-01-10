import React from 'react';
import { News } from 'utils/types';

const NewsFeedListSubContents: React.FC<{ newsList: News[] | null; }> = ({ newsList }) => {
    const renderSearchInstruction = () => {
        return !newsList
            ? (
                <div className='news-feed-no-content'>
                    ↑ Fill a form and search news.
                </div>
            )
            : null;
    };

    const renderNoItemFound = () => {
        return newsList?.length === 0
            ? (
                <div className='news-feed-no-content'>
                    No Item Found
                </div>
            )
            : null;
    };

    const renderNumberOfItem = () => {
        return newsList && newsList.length > 0
            ? (
                <div className='news-feed-number-of-items'>
                    <p>{newsList.length} items found</p>
                </div>
            )
            : null;
    };
    return (
        <>
            {renderSearchInstruction()}
            {renderNoItemFound()}
            {renderNumberOfItem()}
        </>

    );
};

export default React.memo(NewsFeedListSubContents);
