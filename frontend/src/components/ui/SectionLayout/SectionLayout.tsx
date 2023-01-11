import React from 'react';

interface SectionLayoutProps {
    component: React.ElementType;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({ component: Component }) => (
    <div className='section-layout'>
        <Component />
    </div>
);

export default SectionLayout;
