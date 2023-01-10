import React from 'react';

const SearchFormCloseButton: React.FC<{ handleSearchFormOpen: () => void; }> = ({ handleSearchFormOpen }) => {
    return (
        <button
            type='button'
            className='news-feed-search-form-closeBtn'
            onClick={handleSearchFormOpen}
        >
            X
        </button>
    );
};

const SearchFormOpenButton: React.FC<{ handleSearchFormOpen: () => void; }> = ({ handleSearchFormOpen }) => {
    return (
        <button
            type='button'
            className='news-feed-search-form-searchBtn'
            onClick={handleSearchFormOpen}
        >
            Search
        </button>
    );
};


export { SearchFormCloseButton, SearchFormOpenButton };
