import { useNavigate } from 'react-router-dom';
import type { NavigateFunction } from 'react-router-dom';

interface LpProps {
    handleNavigate: NavigateFunction;
}

interface LpContainerProps { }

const Lp: React.FC<LpProps> = ({ handleNavigate }) => {
    return (
        <div className="lp-container">
            <h1 className='lp-title'>React News Feed⚡️</h1>
            <button
                type='button'
                className='lp-startBtn'
                onClick={() => handleNavigate('/news/search')}
            >
                Get started
            </button>
        </div>
    );
};

const LpContainer: React.FC<LpContainerProps> = () => {
    const navigate = useNavigate();

    return <Lp handleNavigate={navigate} />;
};

export default LpContainer;