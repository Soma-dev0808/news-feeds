import React from 'react';

import 'styles/sectionLayout.scss';

interface SectionLayoutProps {
    component: React.ElementType;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({ component: Component }) => {
    return (
        <div className='section-layout'>
            <Component />
        </div>
    );
};

export default SectionLayout;
