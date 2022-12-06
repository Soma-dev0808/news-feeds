import React from 'react';
import { getToday } from '../../utils/utils';

import '../../styles/searchForm.scss';

interface SearchFormProps {
    submitAction: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ submitAction }) => {
    return (
        <form
            className='search-form'
            onSubmit={submitAction}
        >
            <div className='search-input-item'>
                <label htmlFor="keyword-input">
                    Keyword
                </label>
                <input
                    id="keyword-input"
                    name='searchKeyword'
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
            <button type='submit' className='search-search-button'>
                Search
            </button>
        </form>
    );
};

export default SearchForm;
