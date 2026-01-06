import React from "react";
import "./navigationBar.css";


const NavigationBar = () => {

    return (
        <div className="navigation-bar-max">
            <div className="top-block__line navigation-bar-max__top-block__line"></div>
            <ul className="navigation-bar-max__navigation-list">
                <li className="nbm-navigation-list__item">
                    <img src="../images/dachbord_icon.svg" className="nbm-navigation-item__icon" alt="#"/>
                    <div className="nbm-navigation-item__name">Основная панель</div>
                </li> 
                <li className="nbm-navigation-list__item">
                    <img src="../images/dachbord_icon.svg" className="nbm-navigation-item__icon" alt="#"/>
                    <div className="nbm-navigation-item__name">Складские документы</div>
                </li>
            </ul>
        </div>
    );
};

export default NavigationBar;