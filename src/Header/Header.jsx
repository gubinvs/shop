import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./Header.css";

const Header = () => {
    const [itemBasket, setItemBasket] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const updateBasketCount = () => {
        let totalCount = 0;

        // basketItem
        const basketItem = localStorage.getItem("basketItem");
        if (basketItem) {
            try {
                const parsedBasket = JSON.parse(basketItem);
                totalCount += Array.isArray(parsedBasket) ? parsedBasket.length : 0;
            } catch (error) {
                console.error("Ошибка парсинга basketItem:", error);
            }
        }

        // cart
        const cartItem = localStorage.getItem("cart");
        if (cartItem) {
            try {
                const parsedCart = JSON.parse(cartItem);
                totalCount += Array.isArray(parsedCart) ? parsedCart.length : 0;
            } catch (error) {
                console.error("Ошибка парсинга cart:", error);
            }
        }

        setItemBasket(totalCount);
    };

    useEffect(() => {
        updateBasketCount();

        const handleStorageChange = (event) => {
            if (event.key === "basketItem" || event.key === "cart") {
                updateBasketCount();
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() !== "") {
            setSearchResults([
                `Результат для "${value}" 1`,
                `Результат для "${value}" 2`,
                `Результат для "${value}" 3`,
            ]);
        } else {
            setSearchResults([]);
        }
    };

    const itemBasketIcon = itemBasket === 0 ? "item-basket-icon_none" : "item-basket-icon";

    const indexPage = () => navigate('/');
    const basketPage = () => navigate('/Basket');
    const orderPage = () => navigate('/DefineUser');
    const companyDashboard = () => navigate('/CompanyDashboard');

    return (
        <>
            <header>
                <div className="container header__container">
                    <div className="header-logo-block" onClick={indexPage}>
                        <picture>
                            <source srcSet="../../images/header_logo_1280.svg" media="(max-width: 1280px)" />
                            <img src="../../images/header_logo_1920.svg" alt="Логотип компании" />
                        </picture>
                    </div>
                    <div className="header-navigation-block">
                        <div className="header-navigation-block__top">
                            <div className="search-input-block">
                                <input 
                                    className="search-input" 
                                    placeholder="Поиск по артикулу" 
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setTimeout(() => setIsFocused(false), 150)}
                                />
                                <div className="search-icon">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line y1="-0.5" x2="11.612" y2="-0.5" transform="matrix(0.707961 0.706251 -0.707961 0.706251 5.81306 6.29901)" stroke="#1D252C" />
                                        <path d="M11.1261 6.29899C11.1261 9.2244 8.74848 11.598 5.81303 11.598C2.87758 11.598 0.5 9.2244 0.5 6.29899C0.5 3.37358 2.87758 1 5.81303 1C8.74848 1 11.1261 3.37358 11.1261 6.29899Z" fill="white" stroke="#1D252C" />
                                    </svg>
                                </div>

                                {isFocused && searchResults.length > 0 && (
                                    <div className="search-results">
                                        <ul>
                                            {searchResults.map((result, index) => (
                                                <li key={index} className="search-result-item">
                                                    {result}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="header-navigation-block__botttom">
                            <ul className="header-navigation__list">
                                <li className="header-navigation__item"><a href="https://www.iek.ru/products/catalog/tipovye_resheniya_nku">Типовые решения</a></li>
                                <li className="header-navigation__item">
                                    <a href="/Personal" className={location.pathname === '/Personal' ? 'nav-active' : ''}>
                                        Комплектующие
                                    </a>
                                </li>
                                <li className="header-navigation__item">
                                    <a href="/DeliveryAndPayment" className={location.pathname === '/DeliveryAndPayment' ? 'nav-active' : ''}>
                                        Доставка и оплата
                                    </a>
                                </li>
                                <li className="header-navigation__item"><a href="https://encomponent.ru/about.php">Контакты</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="header-basket-block">
                        <ul className="header-basket-block__list" onClick={companyDashboard}>
                            <li className="header-basket-block-icon__item">
                                <img src={location.pathname === '/CompanyDashboard' ? '../../images/iconCompanyBlue.svg' : '../../images/iconCompanyBlack.svg'} className="header-basket-block-icon__img header-basket-block-icon__img_comp" />
                            </li>
                            <li className={location.pathname === '/CompanyDashboard' ? 'header-basket-block-icon__item header-basket-block-icon__item_active' : 'header-basket-block-icon__item'}>
                                Компания
                            </li>
                        </ul>
                        <ul className="header-basket-block__list" onClick={orderPage}>
                            <li className="header-basket-block-icon__item">
                                <img src={location.pathname === '/DefineUser' ? '../../images/orderBlue.svg' : '../../images/orderBlack.svg'} className="header-basket-block-icon__img" />
                            </li>
                            <li className={location.pathname === '/DefineUser' ? 'header-basket-block-icon__item header-basket-block-icon__item_active' : 'header-basket-block-icon__item hbbi-item'}>
                                Заказы
                            </li>
                        </ul>
                        <ul className="header-basket-block__list header-basket-block__list_basket" onClick={basketPage}>
                            <li className="header-basket-block-icon__item">
                                <img 
                                    src={location.pathname === '/Basket' ? '../../images/basketBlue.svg' : '../../images/basketBlack.svg'} 
                                    className="header-basket-block-icon__img header-basket-block-icon__img_basket" />
                            </li>
                            <li className={location.pathname === '/Basket' ? 'header-basket-block-icon__item header-basket-block-icon__item_active' : 'header-basket-block-icon__item'}>
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
