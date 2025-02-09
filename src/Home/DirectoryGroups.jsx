import React from 'react';
import './DirectoryGroups.css';

const DirectoryGroups = () => {
    return (
        <>
        <div className="container directory-groups__container">
            <h2 className="directory-groups__title">Популярные категории</h2>
            <div className="dg-card-section">
                <div className="dg-card dg-card1 hvr-grow-shadow">
                    <div className="dg-card__title">Модульное оборудование</div>
                </div>
                <div className="dg-card__groop">
                    <div className="dg-card dg-card2 hvr-grow-shadow">
                        <div className="dg-card__title">Источники питания</div>
                    </div>
                    <div className="dg-card dg-card3 hvr-grow-shadow">
                        <div className="dg-card__title">Клеммы и ...</div>
                    </div>
                </div>
                <div className="dg-card dg-card4 hvr-grow-shadow">
                    <div className="dg-card__title dg-card__title_card4">Щитовое оборудование</div>
                </div>
                <div className="dg-card__groop">
                    <div className="dg-card dg-card5 hvr-grow-shadow">
                        <div className="dg-card__title dg-card__title_dg-card5">Логические контроллеры</div>
                    </div>
                    <div className="dg-card dg-card6 hvr-grow-shadow">
                        <div className="dg-card__title dg-card__title_dg-card5">Модули расширения</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default DirectoryGroups;