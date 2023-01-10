import { useNavigate } from 'react-router-dom';
import SearchForm from 'components/models/search/SearchForm';

const Search = () => {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const searchKeyword = e.currentTarget.searchKeyword.value;
        const dateFrom = e.currentTarget.dateFrom.value;
        const sortBy = e.currentTarget.sortBy.value;

        navigate('/news/list', {
            state: {
                searchCond: {
                    q: searchKeyword,
                    from: dateFrom,
                    sortBy: sortBy,
                    language: 'en',
                }
            }
        });
    };

    return (
        <div className='search-page-container'>
            <div className='search-page-form'>
                <SearchForm submitAction={handleSubmit} />
            </div>
        </div>
    );
};

export default Search;