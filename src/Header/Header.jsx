import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./Header.css";
import ApiUrl from '../js/ApiUrl';
import { 
    chapterMa, chapterBp, chapterK, chapterSch, 
    chapterPlk, chapterMplk, chapterSl, chapterUps, 
    OpenSection 
} from "../js/LinkSectionGroup.js";

const Header = () => {
    
    const [itemBasket, setItemBasket] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isHoveringResults, setIsHoveringResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isCatalogVisible, setCatalogVisible] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationText, setNotificationText] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const countBasketItems = () => {
        let totalCount = 0;
        const keys = ["basketItem", "cart", "search"];

        keys.forEach(key => {
            const item = localStorage.getItem(key);
            if (item) {
                try {
                    const parsed = JSON.parse(item);
                    totalCount += Array.isArray(parsed) ? parsed.length : 0;
                } catch (error) {
                    console.error(`Ошибка парсинга ${key}:`, error);
                }
            }
        });

        setItemBasket(totalCount);
    };

    useEffect(() => {
        countBasketItems();

        const handleStorageChange = (event) => {
            if (["basketItem", "cart", "search"].includes(event.key)) {
                countBasketItems();
            }
        };
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() !== "") {
            try {
                const response = await fetch(`${ApiUrl}/api/SearchArticle/${value}`);
                if (response.ok) {
                    const data = await response.json();
                    setSearchResults(data);
                } else {
                    console.error("Ошибка при получении данных поиска");
                    setSearchResults([]);
                }
            } catch (error) {
                console.error("Ошибка сети:", error);
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleAddToBasket = (item) => {
        const searchBasket = localStorage.getItem("search");
        let updatedBasket = [];

        if (searchBasket) {
            try {
                updatedBasket = JSON.parse(searchBasket);
                if (!Array.isArray(updatedBasket)) {
                    updatedBasket = [];
                }
            } catch (error) {
                console.error("Ошибка парсинга searchBasket:", error);
            }
        }

        const existingItem = updatedBasket.find(b => b.id === item.id);

        if (existingItem) {
            existingItem.quantity = existingItem.quantity ? existingItem.quantity + 1 : 2;
        } else {
            updatedBasket.push({ ...item, quantity: 1 });
        }

        localStorage.setItem("search", JSON.stringify(updatedBasket));
        countBasketItems();

        setNotificationText(`Товар "${item.name}" добавлен в корзину`);
        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
        }, 2500);
    };

    const itemBasketIcon = itemBasket === 0 ? "item-basket-icon_none" : "item-basket-icon";

    const indexPage = () => navigate('/');
    const basketPage = () => navigate('/Basket');
    const orderPage = () => navigate('/DefineUser');
    const companyDashboard = () => navigate('/CompanyDashboard');
    const toggleCatalog = () => setCatalogVisible(prev => !prev);
    const ClearToken = () => {
        localStorage.clear("token");
        window.location.href="/";
    }; // Очиста localStorage("token"); Выход из системы

    return (
        <>
            <header>
                <div className="container contact-header-block">
                    <div className="contact-header-block__nav">
                        <div className="contact-header-block__phone">8 (812) 921-59-71</div>
                        <div className="contact-header-block__adress">Санкт-Петербург</div>
                        <div className="contact-header-block__email">office@encomponent.ru</div>
                    </div>
                    <button className="contact-header-block__button-out" onClick={()=>ClearToken()}>Выйти</button>
                    <div className="header-basket-block_mobile">
                        <ul className="header-basket-block__list" onClick={companyDashboard}>
                            <li className="header-basket-block-icon__item">
                                <img src={location.pathname === '/CompanyDashboard' ? '../../images/iconCompanyBlue.svg' : '../../images/iconCompanyBlack.svg'} className="header-basket-block-icon__img header-basket-block-icon__img_comp" />
                            </li>
                            <li className={location.pathname === '/CompanyDashboard' ? 'header-basket-block-icon__item header-basket-block-icon__item_active header-basket-block-icon__item_mobile' : 'header-basket-block-icon__item header-basket-block-icon__item_mobile'}>
                                Компания
                            </li>
                        </ul>
                        <ul className="header-basket-block__list" onClick={orderPage}>
                            <li className="header-basket-block-icon__item">
                                <img src={location.pathname === '/DefineUser' ? '../../images/orderBlue.svg' : '../../images/orderBlack.svg'} className="header-basket-block-icon__img" />
                            </li>
                            <li className={location.pathname === '/DefineUser' ? 'header-basket-block-icon__item header-basket-block-icon__item_active header-basket-block-icon__item_mobile' : 'header-basket-block-icon__item hbbi-item header-basket-block-icon__item_mobile'}>
                                Заказы
                            </li>
                        </ul>
                        <ul className="header-basket-block__list header-basket-block__list_basket" onClick={basketPage}>
                            <li className="header-basket-block-icon__item">
                                <img
                                    src={location.pathname === '/Basket' ? '../../images/basketBlue.svg' : '../../images/basketBlack.svg'}
                                    className="header-basket-block-icon__img header-basket-block-icon__img_basket" />
                            </li>
                            <li className={location.pathname === '/Basket' ? 'header-basket-block-icon__item header-basket-block-icon__item_active header-basket-block-icon__item_mobile' : 'header-basket-block-icon__item header-basket-block-icon__item_mobile'}>
                                Корзина
                            </li>
                            <li className={itemBasketIcon}>{itemBasket}</li>
                        </ul>
                    </div>
                </div>

                <div className="container header__container">
                    <div className="header-logo-block" onClick={indexPage}>
                        <img src="../../images/header_logo_1920.svg" alt="Логотип компании" />
                    </div>

                    <div className="header-navigation-block">
                        <div className="header-navigation-block__top header-navigation-block__top_guest">
                            <div className="search-input-block">
                                <button className="button-catalog" onClick={toggleCatalog}>
                                    {isCatalogVisible ? 'X' : 'Каталог'}
                                </button>

                                {isCatalogVisible && (
                                    <ul className="catalog__list">
                                        <li className="catalog__item" onClick={() => OpenSection(chapterMa)}>Модульные автоматы</li>
                                        <li className="catalog__item"onClick={() => OpenSection(chapterBp)}>Блоки питания</li>
                                        <li className="catalog__item" onClick={() => OpenSection(chapterK)}>Клеммы и маркировка</li>
                                        <li className="catalog__item" onClick={() => OpenSection(chapterSch)}>Типовые решения НКУ</li>
                                        <li className="catalog__item" onClick={() => OpenSection(chapterPlk)}>Логические контроллеры</li>
                                        <li className="catalog__item" onClick={() => OpenSection(chapterMplk)}>Модули расширения</li>
                                    </ul>
                                )}

                                <input
                                    className="search-input"
                                    placeholder="Поиск по артикулу"
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setTimeout(() => setIsFocused(false), 150)}
                                />

                                {(isFocused || isHoveringResults) && searchResults.length > 0 && (
                                    <div
                                        className="search-results"
                                        onMouseEnter={() => setIsHoveringResults(true)}
                                        onMouseLeave={() => setIsHoveringResults(false)}
                                    >
                                        <ul className="search-result__list">
                                            {searchResults.map((result, index) => (
                                                <li key={index} className="search-result__item">
                                                    <div className="search-result-item__info">
                                                        {result.vendorCode} - {result.name}
                                                    </div>
                                                    <button
                                                        className="search-result-item__add-button"
                                                        onClick={() => handleAddToBasket(result)}
                                                    >
                                                        В корзину
                                                    </button>
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
                            <li className={location.pathname === '/CompanyDashboard' ? 'header-basket-block-icon__item header-basket-block-icon__item_active header-basket-block-icon__item_mobile' : 'header-basket-block-icon__item header-basket-block-icon__item_mobile'}>
                                Компания
                            </li>
                        </ul>
                        <ul className="header-basket-block__list" onClick={orderPage}>
                            <li className="header-basket-block-icon__item">
                                <img src={location.pathname === '/DefineUser' ? '../../images/orderBlue.svg' : '../../images/orderBlack.svg'} className="header-basket-block-icon__img" />
                            </li>
                            <li className={location.pathname === '/DefineUser' ? 'header-basket-block-icon__item header-basket-block-icon__item_active header-basket-block-icon__item_mobile' : 'header-basket-block-icon__item hbbi-item header-basket-block-icon__item_mobile'}>
                                Заказы
                            </li>
                        </ul>
                        <ul className="header-basket-block__list header-basket-block__list_basket" onClick={basketPage}>
                            <li className="header-basket-block-icon__item">
                                <img
                                    src={location.pathname === '/Basket' ? '../../images/basketBlue.svg' : '../../images/basketBlack.svg'}
                                    className="header-basket-block-icon__img header-basket-block-icon__img_basket" />
                            </li>
                            <li className={location.pathname === '/Basket' ? 'header-basket-block-icon__item header-basket-block-icon__item_active header-basket-block-icon__item_mobile' : 'header-basket-block-icon__item header-basket-block-icon__item_mobile'}>
                                Корзина
                            </li>
                            <li className={itemBasketIcon}>{itemBasket}</li>
                        </ul>
                    </div>
                </div>
            </header>
            {/* Сообщение о добавленном товаре */}
            {showNotification && (
                <div className="basket-notification">
                    {notificationText}
                </div>
            )}
        </>
    );
};

export default Header;
