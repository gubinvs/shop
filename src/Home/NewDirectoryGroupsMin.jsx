import React from 'react';
import './newDirectoryGroups.css';
import {  chapterPlk, chapterMplk, OpenSection, chapterContactor, chapterSch, chapterK, chapterBp, chapterNKU
} from "../js/LinkSectionGroup.js";

const NewDirectoryGroupsMin = () => {
    return (
        <div className="new-directory-groups-section">
            <div className="container new-directory-groups__container">
                <h2 className="directory-groups__title h1-min">Категории каталога</h2>
                <div className="ndg-card-section ">
                    <div className="ndg-card ndg-card_min ndg-card_contactor-groop hvr-grow-shadow" onClick={() => OpenSection(chapterContactor)}>
                        <div className="ndg-card__title ndg-card__title_contactor">Силовые контакторы</div>
                        <div className="ndg-card__discr ndg-card__discr_contactor">для управления электродвигателями и промышленными нагрузками средней мощности.</div>
                        <img 
                            className='ndg-card-images_arrow ndg-card-images-arrow_min' 
                            src="/images/new-img-catalog-groop/arrow-right.png" 
                            alt="#"  
                            onClick={() => OpenSection(chapterContactor)}
                        />
                    </div>
                    <div className="ndg-card ndg-card_min  ndg-card_plc hvr-grow-shadow" onClick={() => OpenSection(chapterPlk)}>
                        <div className="ndg-card__title ndg-card__title_plc">Блоки базовые - PLC</div>
                        <div className="ndg-card__discr ndg-card__discr_plc">предназначены для гибкого управления промышленными процессами, что обеспечивает удобную интеграцию с другими устройствами</div>  
                        <img 
                            className='ndg-card-images_arrow ndg-card-images-arrow_min' 
                            src="/images/new-img-catalog-groop/arrow-right.png" 
                            alt="#"  
                            onClick={() => OpenSection(chapterPlk)}
                        />
                    </div>
                    <div className="ndg-card ndg-card_min  ndg-card_module-plc hvr-grow-shadow" onClick={() => OpenSection(chapterMplk)}>
                        <div className="ndg-card__title ndg-card__title_module-plc">Модули расширения PLC</div>
                        <div className="ndg-card__discr ndg-card__discr__module-plc">предназначен для увеличения количества входов и выходов на базе логических контроллеров</div>
                        <img 
                            className='ndg-card-images_arrow ndg-card-images-arrow_min' 
                            src="/images/new-img-catalog-groop/arrow-right.png" 
                            alt="#"  
                            onClick={() => OpenSection(chapterMplk)}
                        />
                    </div>
                </div>
            </div>
            <div className="container new-directory-groups__container">
                <div className="ndg-card-section">
                    <div className="ndg-card ndg-card_min ndg-card_gray ndg-card_ip-groop ndg-card_ip-groop_min  hvr-grow-shadow" onClick={() => OpenSection(chapterBp)}>
                        <div className="ndg-card__title ndg-card__title_contactor">Источники питания</div>
                        <div className="ndg-card__discr ndg-card__discr_contactor">обладают широким набором функций обеспечивая высокую эффективность и надежность.</div>
                        <button 
                            className='ndg-card-button_arrow ndg-card-button-arrow_min'
                            onClick={() => OpenSection(chapterBp)}
                        >Подробнее</button>
                    </div>
                    <div className="ndg-card ndg-card_min ndg-card_gray ndg-card_avtom-groop ndg-card_avtom-groop_min hvr-grow-shadow" onClick={() => OpenSection(chapterSch)}>
                        <div className="ndg-card__title ndg-card__title_plc">Выключатели автоматические</div>
                        <div className="ndg-card__discr ndg-card__discr_plc">устройства защиты сети при перегрузках и коротких замыканиях</div>  
                        <button 
                            className='ndg-card-button_arrow ndg-card-button-arrow_min'
                            onClick={() => OpenSection(chapterSch)}
                        >Подробнее</button>
                    </div>
                    <div className="ndg-card ndg-card_min ndg-card_gray ndg-card_klem-groop ndg-card_klem-groop_min hvr-grow-shadow" onClick={() => OpenSection(chapterK)}>
                        <div className="ndg-card__title ndg-card__title_module-plc">Средства монтажа</div>
                        <div className="ndg-card__discr ndg-card__discr__module-plc">аксессуары и монтажные элементы для безопасной и удобной установки электрического оборудования</div>
                        <button 
                            className='ndg-card-button_arrow ndg-card-button-arrow_min'
                            onClick={() => OpenSection(chapterK)}
                        >Подробнее</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewDirectoryGroupsMin;