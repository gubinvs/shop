import React from 'react';
import './newDirectoryGroups.css';
import { 
    chapterMa, chapterBp, chapterK, chapterSch, 
    chapterPlk, chapterMplk, chapterSl,
    OpenSection 
} from "../js/LinkSectionGroup.js";

const NewDirectoryGroups = () => {
    return (
        <div className="container directory-groups__container">
            <h2 className="directory-groups__title">Категории магазина</h2>
        </div>
    );
};

export default NewDirectoryGroups;