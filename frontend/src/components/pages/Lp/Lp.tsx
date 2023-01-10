import { useNavigate } from 'react-router-dom';

const Lp = () => {

    const navigate = useNavigate();

    return (
        <div className="lp-container">
            <h1 className='lp-title'>React News Feed⚡️</h1>
            <button
                type='button'
                className='lp-startBtn'
                onClick={() => navigate('/news/search')}
            >
                Get started
            </button>
        </div>
    );
};

export default Lp;