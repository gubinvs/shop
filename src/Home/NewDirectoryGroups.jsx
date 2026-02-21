import React from 'react';
import './newDirectoryGroups.css';
import {  
    chapterPlk, chapterMplk,
    OpenSection, chapterContactor
} from "../js/LinkSectionGroup.js";

const NewDirectoryGroups = () => {
    return (
        <div className="container new-directory-groups__container">
            <h2 className="directory-groups__title">Категории каталога</h2>
            <div className="ndg-card-section">
                <div className="ndg-card ndg-card_contactor-groop">
                    <div className="ndg-card__title ndg-card__title_contactor">Силовые контакторы</div>
                    <div className="ndg-card__discr ndg-card__discr_contactor">для управления электродвигателями и промышленными нагрузками средней мощности.</div>
                    <img 
                        className='ndg-card-images_arrow' 
                        src="/images/new-img-catalog-groop/arrow-right.png" 
                        alt="#"  
                        onClick={() => OpenSection(chapterContactor)}
                    />
                </div>
                <div className="ndg-card ndg-card_plc">
                    <div className="ndg-card__title ndg-card__title_plc">Блоки базовые - PLC</div>
                    <div className="ndg-card__discr ndg-card__discr_plc">предназначены для гибкого управления промышленными процессами, что обеспечивает удобную интеграцию с другими устройствами</div>  
                    <img 
                        className='ndg-card-images_arrow' 
                        src="/images/new-img-catalog-groop/arrow-right.png" 
                        alt="#"  
                        onClick={() => OpenSection(chapterPlk)}
                    />
                </div>
                <div className="ndg-card ndg-card_module-plc">
                    <div className="ndg-card__title ndg-card__title_module-plc">Модули расширения PLC</div>
                    <div className="ndg-card__discr ndg-card__discr__module-plc">предназначен для увеличения количества входов и выходов на базе логических контроллеров</div>
                    <img 
                        className='ndg-card-images_arrow' 
                        src="/images/new-img-catalog-groop/arrow-right.png" 
                        alt="#"  
                        onClick={() => OpenSection(chapterMplk)}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewDirectoryGroups;