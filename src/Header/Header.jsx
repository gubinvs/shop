import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./Header.css";
import ApiUrl from '../js/ApiUrl';

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

    const updateBasketCount = () => {
        let totalCount = 0;
        const basketItem = localStorage.getItem("basketItem");
        if (basketItem) {
            try {
                const parsedBasket = JSON.parse(basketItem);
                totalCount += Array.isArray(parsedBasket) ? parsedBasket.length : 0;
            } catch (error) {
                console.error("Ошибка парсинга basketItem:", error);
            }
        }
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

    // Реальный поиск
    const handleInputChange = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.trim() !== "") {
            try {
                const response = await fetch(`${ApiUrl}/api/SearchArticle/${value}`);
                if (response.ok) {
                    const data = await response.json();
                    setSearchResults(data);
                    console.log(data);
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

    // Добавление товара в корзину
    const handleAddToBasket = (item) => {
        const basketItem = localStorage.getItem("basketItem");
        let updatedBasket = [];

        if (basketItem) {
            try {
                updatedBasket = JSON.parse(basketItem);
                if (!Array.isArray(updatedBasket)) {
                    updatedBasket = [];
                }
            } catch (error) {
                console.error("Ошибка парсинга basketItem:", error);
            }
        }

        const existingItem = updatedBasket.find(b => b.id === item.id);

        if (existingItem) {
            existingItem.quantity = existingItem.quantity ? existingItem.quantity + 1 : 2;
        } else {
            updatedBasket.push({ ...item, quantity: 1 });
        }

        localStorage.setItem("basketItem", JSON.stringify(updatedBasket));
        updateBasketCount();

        // Показ уведомления
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
    const catalogDisplay = () => {
        setCatalogVisible(prev => !prev);
    };

    return (
        <>
            <header>
                {/* Верхний блок контактов */}
                <div className="container contact-header-block">
                    <div className="contact-header-block__phone">
                        8 (812) 921-59-71
                    </div>
                    <div className="contact-header-block__adress">
                        Санкт-Петербург
                    </div>
                    <div className="contact-header-block__email">
                        office@encomponent.ru
                    </div>
                </div>

                {/* Основной блок хедера */}
                <div className="container header__container">
                    <div className="header-logo-block" onClick={indexPage}>
                        <picture>
                            <source srcSet="../../images/header_logo_1280.svg" media="(max-width: 1280px)" />
                            <img src="../../images/header_logo_1920.svg" alt="Логотип компании" />
                        </picture>
                    </div>
                    <div className="header-navigation-block">
                        <div className="header-navigation-block__top header-navigation-block__top_guest">
                            <div className="search-input-block">
                                <button className="button-catalog" onClick={catalogDisplay}>
                                    {isCatalogVisible ? 'X' : 'Каталог'}
                                </button>

                                {isCatalogVisible && (
                                    <ul className="catalog__list">
                                        <li className="catalog__item">Модульное оборудование</li>
                                        <li className="catalog__item">Источники питания</li>
                                        <li className="catalog__item">Клеммы и маркировка</li>
                                        <li className="catalog__item">Щитовое оборудование</li>
                                        <li className="catalog__item">Логические контроллеры</li>
                                        <li className="catalog__item">Модули расширения</li>
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
                                        <ul>
                                            {searchResults.map((result) => (
                                                <li key={result.id} className="search-result-item">
                                                    <div className="search-result-item__info">
                                                        {result.article} - {result.name}
                                                    </div>
                                                    <button
                                                        className="search-result-item__add-button"
                                                        onClick={() => handleAddToBasket(result)}
                                                    >
                                                        Добавить в корзину
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Нижняя навигация */}
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

                    {/* Блок иконок справа */}
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

            {showNotification && (
                <div className="basket-notification">
                    {notificationText}
                </div>
            )}
        </>
    );
};

export default Header;
