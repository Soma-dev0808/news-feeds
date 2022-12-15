import React from 'react';
import { compareObjs } from '../../utils/utils';

import type { News } from '../../utils/types';

const Star: React.FC<Partial<News>> = (objToSave) => {
    const handleFavClick = () => {
        const nlStringified = localStorage.getItem('favorites');
        let newsList = [] as Partial<News>[];
        if (nlStringified) {
            newsList = [...JSON.parse(nlStringified)];
        }

        // if the item is alread saved, remove it
        if (newsList.findIndex((nl) => compareObjs(nl, objToSave)) !== -1) {
            newsList = newsList.filter(nl => !compareObjs(nl, objToSave));
        } else {
            newsList.push(objToSave);
        }

        localStorage.setItem('favorites', JSON.stringify(newsList));
    };

    return (
        <div onClick={handleFavClick}>Star</div>
    );
};

export default Star;