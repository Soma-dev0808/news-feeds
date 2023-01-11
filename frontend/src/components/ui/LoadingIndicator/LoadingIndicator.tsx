const LoadingIndicator: React.FC<{ isOverlay: boolean; }> = ({ isOverlay }) => (
    <div className={`loading-indicator-container${isOverlay ? '-overlay' : ''}`}>
        <div className={`loading-indicator-inner${isOverlay ? '-overlay' : ''}`} >
            <div className='loading-indicator-bar loading-indicator-bar1'></div>
            <div className='loading-indicator-bar loading-indicator-bar2'></div>
            <div className='loading-indicator-bar loading-indicator-bar3'></div>
            <div className='loading-indicator-bar loading-indicator-bar4'></div>
            <div className='loading-indicator-bar loading-indicator-bar5'></div>
            <div className='loading-indicator-bar loading-indicator-bar6'></div>
            <div className='loading-indicator-bar loading-indicator-bar7'></div>
            <div className='loading-indicator-bar loading-indicator-bar8'></div>
        </div>
    </div>
);

export default LoadingIndicator;
