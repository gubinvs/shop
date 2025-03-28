import React from 'react';
import './DirectoryGroups.css';
import { 
    chapterMa, chapterBp, chapterK, chapterSch, 
    chapterPlk, chapterMplk, chapterSl, chapterUps, 
    OpenSection 
} from "../js/LinkSectionGroup.js";

const DirectoryGroups = () => {
    return (
        <div className="container directory-groups__container">
            <h2 className="directory-groups__title">Популярные категории</h2>
            <div className="dg-card-section">
                <div className="dg-card dg-card1 hvr-grow-shadow" onClick={() => OpenSection(chapterMa)}>
                    <div className="dg-card__title">Модульные автоматы</div>
                </div>
                <div className="dg-card__groop">
                    <div className="dg-card dg-card2 hvr-grow-shadow" onClick={() => OpenSection(chapterBp)}>
                        <div className="dg-card__title">Блоки питания</div>
                    </div>
                    <div className="dg-card dg-card3 hvr-grow-shadow" onClick={() => OpenSection(chapterK)}>
                        <div className="dg-card__title">Клеммы и ...</div>
                    </div>
                </div>
                <div className="dg-card dg-card4 hvr-grow-shadow" onClick={() => OpenSection(chapterSch)}>
                    <div className="dg-card__title dg-card__title_card4">Типовые решения НКУ</div>
                </div>
                <div className="dg-card__groop">
                    <div className="dg-card dg-card5 hvr-grow-shadow" onClick={() => OpenSection(chapterPlk)}>
                        <div className="dg-card__title dg-card__title_dg-card5">Логические контроллеры</div>
                    </div>
                    <div className="dg-card dg-card6 hvr-grow-shadow" onClick={() => OpenSection(chapterMplk)}>
                        <div className="dg-card__title dg-card__title_dg-card5">Модули расширения</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DirectoryGroups;