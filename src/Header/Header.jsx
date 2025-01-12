import React, { useState } from "react";
import ApiUrl from '../js/ApiUrl.js';
import { data } from "react-router-dom";
import "./Header.css";


const Header =() => {

    return (
        <>
            <header>
                <div className="header__container">
                    <div className="header-logo-block">
                        <picture>
                            <source srcset="../../images/header_logo_1280.svg" media="(max-width: 1280px)"/>
                            <source srcset="../../images/header_logo_960.svg" media="(max-width: 960px)"/>
                            <img src="../../images/header_logo_1920.svg" alt="Логотип компании"/>
                        </picture>
                    </div>
                    <div className="header-navigation-block">
                        <div className="header-navigation-block__top">
                            <div className="search-input-block">
                                <input className="search-input" placeholder="Поиск"/>
                                <div className="search-icon">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line y1="-0.5" x2="11.612" y2="-0.5" transform="matrix(0.707961 0.706251 -0.707961 0.706251 5.81306 6.29901)" stroke="#1D252C" />
                                        <path d="M11.1261 6.29899C11.1261 9.2244 8.74848 11.598 5.81303 11.598C2.87758 11.598 0.5 9.2244 0.5 6.29899C0.5 3.37358 2.87758 1 5.81303 1C8.74848 1 11.1261 3.37358 11.1261 6.29899Z" fill="white" stroke="#1D252C" />
                                    </svg>
                                </div>
                            </div>
                            <div class="download-icon">
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.29289 15.2071C9.68342 15.5976 10.3166 15.5976 10.7071 15.2071L17.0711 8.84315C17.4616 8.45262 17.4616 7.81946 17.0711 7.42893C16.6805 7.03841 16.0474 7.03841 15.6569 7.42893L10 13.0858L4.34315 7.42893C3.95262 7.03841 3.31946 7.03841 2.92893 7.42893C2.53841 7.81946 2.53841 8.45262 2.92893 8.84315L9.29289 15.2071ZM9 0.5V14.5H11V0.5L9 0.5Z" fill="#1D252C" />
                                    <line y1="19.5" x2="20" y2="19.5" stroke="#1D252C" stroke-width="2" />
                                    <line x1="19" y1="16.5" x2="19" y2="19.5" stroke="#1D252C" stroke-width="2" />
                                    <line x1="1" y1="16.5" x2="1" y2="19.5" stroke="#1D252C" stroke-width="2" />
                                </svg>
                            </div>
                            <div className="downloud-catalog"><a href="https://encomponent.ru/files/catalog-all-latest.zip">Каталог</a></div>
                            <div className="download-icon">
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.29289 15.2071C9.68342 15.5976 10.3166 15.5976 10.7071 15.2071L17.0711 8.84315C17.4616 8.45262 17.4616 7.81946 17.0711 7.42893C16.6805 7.03841 16.0474 7.03841 15.6569 7.42893L10 13.0858L4.34315 7.42893C3.95262 7.03841 3.31946 7.03841 2.92893 7.42893C2.53841 7.81946 2.53841 8.45262 2.92893 8.84315L9.29289 15.2071ZM9 0.5V14.5H11V0.5L9 0.5Z" fill="#1D252C" />
                                    <line y1="19.5" x2="20" y2="19.5" stroke="#1D252C" stroke-width="2" />
                                    <line x1="19" y1="16.5" x2="19" y2="19.5" stroke="#1D252C" stroke-width="2" />
                                    <line x1="1" y1="16.5" x2="1" y2="19.5" stroke="#1D252C" stroke-width="2" />
                                </svg>
                            </div>
                            <div className="downloud-price"><a href="https://encomponent.ru/files/price-IEK.zip">Прайс-лист</a></div>



                        </div>  
                        <div className="header-navigation-block__botttom">
                            <ul className="header-navigation__list">
                                <li className="header-navigation__item"><a href="https://encomponent.ru/">Сборка щитов</a></li>
                                <li className="header-navigation__item">Доставка и оплата</li>
                                <li className="header-navigation__item"><a href="https://encomponent.ru/about.html">Контакты</a></li>
                            </ul>
                        </div>                          
                    </div>
                    <div className="header-basket-block">
                        <ul className="header-basket-block__list">
                            <li className="header-basket-block-icon__item"><img src="../../images/iconCompanyBlack.svg" className="header-basket-block-icon__img header-basket-block-icon__img_comp" /></li>
                            <li className="header-basket-block-icon__item">Компания</li>
                        </ul>
                        <ul className="header-basket-block__list">
                            <li className="header-basket-block-icon__item"><img src="../../images/orderBlack.svg" className="header-basket-block-icon__img" /></li>
                            <li className="header-basket-block-icon__item">Заказы</li>
                        </ul>
                        <ul className="header-basket-block__list">
                            <li className="header-basket-block-icon__item"><img src="../../images/basketBlack.svg" className="header-basket-block-icon__img header-basket-block-icon__img_basket" /></li>
                            <li className="header-basket-block-icon__item">Корзина</li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
};
export default Header;