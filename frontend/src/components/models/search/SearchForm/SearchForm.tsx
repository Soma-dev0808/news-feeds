import React from 'react';
import { getToday } from 'utils/utils';

interface SearchFormProps {
    submitAction: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ submitAction }) => {

    return (
        <form
            className='search-form '
            onSubmit={submitAction}
        >
            <div className='search-input-item'>
                <label htmlFor="keyword-input">
                    Search Keyword
                </label>
                <input
                    id="keyword-input"
                    name='searchKeyword'
                    placeholder='Search keyword'
                    type="text"
                />
            </div>

            <div className='search-input-item'>
                <label htmlFor="date-input">
                    Date
                </label>
                <input
                    id="date-input"
                    type="date"
                    name="dateFrom"
                    min={getToday(true)}
                    max={getToday()}
                />
            </div>

            <div className='search-input-item'>
                <label htmlFor="sortBy">
                    Sort by
                </label>
                <select id="sortBy" name="sortBy">
                    <option value="publishedAt">PublishedAt</option>
                    <option value="popularity">Popularity</option>
                    <option value="relevancy">Relevancy</option>
                </select>
            </div>

            <button type='submit' className='search-search-button'>
                Search
            </button>
        </form>
    );
};

export default SearchForm;
