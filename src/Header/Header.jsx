import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./Header.css";

const Header = () => {
    const [itemBasket, setItemBasket] = useState(null); // Начальное состояние - null
    const navigate = useNavigate();

    useEffect(() => {
        const item = localStorage.getItem("basketItem")

        if (item) {
            try {
                const parsedItem = JSON.parse(item);
                
                setItemBasket(parsedItem.length);
            } catch (error) {
               
                setItemBasket(0); // Если ошибка при парсинге, установим значение 0
            }
        } else {
            setItemBasket(0); // Если нет данных в localStorage, установим 0
        }
    });

    const itemBasketIcon = itemBasket === 0 ? "item-basket-icon_none" : "item-basket-icon";

    const indexPage = () => {
        navigate('/');
    };
    const basketPage = () => {
        navigate('/Basket');
    };

    const orderPage = () => {
        navigate('/DefineUser');
    };

    const companyDashboard = () => {
        navigate('/CompanyDashboard');
    };

    const location = useLocation();
  
    return (
        <>
            <header>
                <div className="header__container">
                    <div className="header-logo-block" onClick={indexPage}>
                        <picture>
                            <source srcSet="../../images/header_logo_1280.svg" media="(max-width: 1280px)"/>
                            <source srcSet="../../images/header_logo_960.svg" media="(max-width: 960px)"/>
                            <img src="../../images/header_logo_1920.svg" alt="Логотип компании"/>
                        </picture>
                    </div>
                    <div className="header-navigation-block">
                        <div className="header-navigation-block__top">
                            <div className="search-input-block">
                                <input className="search-input" placeholder="Поиск по артикулу"/>
                                <div className="search-icon">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line y1="-0.5" x2="11.612" y2="-0.5" transform="matrix(0.707961 0.706251 -0.707961 0.706251 5.81306 6.29901)" stroke="#1D252C" />
                                        <path d="M11.1261 6.29899C11.1261 9.2244 8.74848 11.598 5.81303 11.598C2.87758 11.598 0.5 9.2244 0.5 6.29899C0.5 3.37358 2.87758 1 5.81303 1C8.74848 1 11.1261 3.37358 11.1261 6.29899Z" fill="white" stroke="#1D252C" />
                                    </svg>
                                </div>
                            </div>
                        </div>  
                        <div className="header-navigation-block__botttom">
                            <ul className="header-navigation__list">
                                <li className="header-navigation__item">Типовые решения</li>
                                <li className="header-navigation__item">Поставка комплектующих</li>
                                <li className="header-navigation__item"><a href="https://encomponent.ru/">Производство НКУ</a></li>
                                <li className="header-navigation__item">
                                    <a href="/DeliveryAndPayment" className={
                                                                    location.pathname === '/DeliveryAndPayment' ? 
                                                                    'nav-active' : 
                                                                    ''
                                    }>
                                        Доставка и оплата
                                    </a>
                                </li>
                                <li className="header-navigation__item"><a href="https://encomponent.ru/about.html">Контакты</a></li>
                            </ul>
                        </div>                          
                    </div>
                    <div className="header-basket-block">
                        <ul className="header-basket-block__list" onClick={companyDashboard}>
                            <li className="header-basket-block-icon__item">
                                <img src={
                                    location.pathname === '/CompanyDashboard' ? 
                                        '../../images/iconCompanyBlue.svg' :
                                        '../../images/iconCompanyBlack.svg'
                                } className="header-basket-block-icon__img header-basket-block-icon__img_comp" />
                            </li>
                            <li className={
                                location.pathname === '/CompanyDashboard' ? 
                                'header-basket-block-icon__item header-basket-block-icon__item_active' : 
                                'header-basket-block-icon__item'
                                }>
                                    Компания
                            </li>
                        </ul>
                        <ul className="header-basket-block__list" onClick={orderPage}>
                            <li className="header-basket-block-icon__item">
                                <img src={
                                    location.pathname === '/DefineUser' ? 
                                        '../../images/orderBlue.svg' :
                                        '../../images/orderBlack.svg'
                                } className="header-basket-block-icon__img" />
                          
                            </li>
                            <li className={
                                location.pathname === '/DefineUser' ? 
                                    'header-basket-block-icon__item header-basket-block-icon__item_active' : 
                                    'header-basket-block-icon__item hbbi-item'
                                }>
                                    Заказы
                            </li>
                        </ul>
                        <ul className="header-basket-block__list header-basket-block__list_basket" onClick={basketPage}>
                            <li className="header-basket-block-icon__item">
                                <img 
                                    src={
                                        location.pathname === '/Basket' ? 
                                            '../../images/basketBlue.svg' : 
                                            '../../images/basketBlack.svg'
                                        } 
                                    className={
                                        location.pathname === '/Basket' ? 
                                        'header-basket-block-icon__img header-basket-block-icon__img_basket' : 
                                        'header-basket-block-icon__img header-basket-block-icon__img_basket'
                                    } />
                            </li>
                            <li className={
                                location.pathname === '/Basket' ? 
                                'header-basket-block-icon__item header-basket-block-icon__item_active' : 
                                'header-basket-block-icon__item'
                                }> 
                                    Корзина
                            </li>
                            <li className={itemBasketIcon}>{itemBasket}</li>
                        </ul>
                    </div>  
                </div>
            </header>
        </>
    );
};
export default Header;