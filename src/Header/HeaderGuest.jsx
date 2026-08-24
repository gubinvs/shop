import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./header.css";
import ApiUrl from '../js/ApiUrl';
import { chapterMa, chapterBp, chapterK, chapterSch, chapterPlk, chapterMplk, chapterSl, OpenSection, chapterRecord,
    chapterHighVoltage, chapterRele, chapterConverters, chapterInstrument, chapterKorpus, chapterContactor, chapterNKU
 } from "../js/LinkSectionGroup.js";
import { handleAddToBasket } from "../js/handleAddToBasket.js";

const HeaderGuest = () => {
   
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
    const catalogRef = useRef(null);
    const catalogButtonRef = useRef(null);

    // Функция подсчета товаров в корзине
    const countBasketItems = () => {
        const keys = ["cart", "search", "basketItem"];
        const allItems = [];

        keys.forEach(key => {
            const item = localStorage.getItem(key);
            if (item) {
                try {
                    const parsed = JSON.parse(item);
                    if (Array.isArray(parsed)) {
                        allItems.push(...parsed);
                    }
                } catch (error) {
                    console.error(`Ошибка парсинга ${key}:`, error);
                }
            }
        });

        // убираем дубли по guidId (или vendorCode, если guidId нет)
        const uniqueItems = Array.from(
            new Map(
                allItems.map(i => [i.guidId || i.vendorCode, i])
            ).values()
        );

        setItemBasket(uniqueItems.length);
    };

    // Перехватываем setItem для отслеживания изменений в текущей вкладке
    useEffect(() => {
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(this, [key, value]);
            if (["cart", "search"].includes(key)) {
                countBasketItems();
            }
        };

        // Первоначальный подсчёт
        countBasketItems();

        // Событие изменения localStorage в других вкладках
        const handleStorageChange = (event) => {
            if (["cart", "search"].includes(event.key)) {
                countBasketItems();
            }
        };
        window.addEventListener("storage", handleStorageChange);

        // Закрытие каталога при клике вне
        const handleClickOutside = (event) => {
            if (
                catalogRef.current && !catalogRef.current.contains(event.target) &&
                catalogButtonRef.current && !catalogButtonRef.current.contains(event.target)
            ) {
                setCatalogVisible(false);
            }
        };
        document.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            document.removeEventListener("click", handleClickOutside);
            localStorage.setItem = originalSetItem; // восстанавливаем
        };
    }, []);

    // Обработка поиска
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

    const itemBasketIcon = itemBasket === 0 ? "item-basket-icon_none" : "item-basket-icon";

    // Навигация
    // const indexPage = () => { window.location.href = 'https://encomponent.ru'; };
    const indexPage = () => navigate('/');
    const basketPage = () => navigate('/Basket');
    const orderPage = () => navigate('/DefineUser');
    const companyDashboard = () => navigate('/CompanyDashboard');
    const toggleCatalog = () => setCatalogVisible(prev => !prev);
    

    const ClearToken = () => {
        localStorage.removeItem("token"); // удаляем только токен
        window.location.href="/";
    };

    // Переход на страницу товара
    // const GoToPageComp = (link) => {
    //     window.location.href = link;
    // };

    // Переход на страницу товара внутри приложения
    const GoToPageComponent = (vendorCode) => {
        localStorage.setItem("vendorCode_GoToPageComponent", vendorCode);

        if (location.pathname === '/SearchResults') {
            window.location.reload(); // 🔹 перезагружает текущую страницу
        } else {
            navigate('/SearchResults'); // 🔹 переходит на страницу
        }
    };

    return (
        <>
            <header>
                <div className="header__mobile">
                    <div className="header-basket-block header-basket-block_mobile">
                        <div className="header-basket-block__icon header-basket-block__lk" onClick={companyDashboard}></div>
                        <div className="header-basket-block__icon header-basket-block__orders" onClick={orderPage}></div>
                        <div className="header-basket-block__icon header-basket-block__basket header-basket-block__basket_mobile" onClick={basketPage}>
                            <div className={itemBasketIcon}>{itemBasket}</div>
                        </div>
                    </div>
                </div>
                <div className="header__container">
                    <div className="container search-header-block">
                        <div className="header-logo-block" onClick={indexPage}>
                            <img src="../../images/header_logo_1920.svg" alt="Логотип компании" />
                        </div>
                        <div className="header-navigation-block">
                            <div className="header-navigation-block__top header-navigation-block__top_guest">
                                <div className="search-input-block">
                                    <button className="button-catalog" ref={catalogButtonRef} onClick={toggleCatalog}>
                                        <span className="button-catalog__text">
                                            {isCatalogVisible ? 'X' : 'Каталог'}
                                        </span>
                                    </button>

                                    {isCatalogVisible && (
                                        <ul className="catalog__list" ref={catalogRef}>
                                            {/* <li className="catalog__item" onClick={() => OpenSection(chapterMa)}>Модульное оборудование</li> */}
                                            <li className="catalog__item" onClick={() => OpenSection(chapterBp)}>Источники питания</li>
                                            <li className="catalog__item" onClick={() => OpenSection(chapterK)}>Средства монтажа</li>
                                            <li className="catalog__item" onClick={() => OpenSection(chapterContactor)}>Силовые контакторы</li>
                                            <li className="catalog__item" onClick={() => OpenSection(chapterNKU)}>Типовые НКУ</li>
                                            <li className="catalog__item" onClick={() => OpenSection(chapterPlk)}>Логические контроллеры</li>
                                            {/* <li className="catalog__item" onClick={() => OpenSection(chapterSl)}>Индикация</li> */}
                                            <li className="catalog__item" onClick={() => OpenSection(chapterMplk)}>Модули расширения</li>
                                            {/* <li className="catalog__item" onClick={() => OpenSection(chapterRecord)}>Средства измерения</li> */}
                                            {/* <li className="catalog__item" onClick={() => OpenSection(chapterHighVoltage)}>Оборудование высоковольтное</li> */}
                                            {/* <li className="catalog__item" onClick={() => OpenSection(chapterRele)}>Реле и аксессуары к ним</li> */}
                                            {/* <li className="catalog__item" onClick={() => OpenSection(chapterConverters)}>Преобразователи частоты</li> */}
                                            {/* <li className="catalog__item" onClick={() => OpenSection(chapterInstrument)}>Инструмент электромонтажный</li> */}
                                            {/* <li className="catalog__item" onClick={() => OpenSection(chapterKorpus)}>Корпуса, боксы, НКУ</li>          */}
                                        </ul>
                                    )}
                                    <div className="search-input__fon">
                                        <input
                                            className="search-input"
                                            placeholder="Искать по артикулу"
                                            value={searchTerm}
                                            onChange={handleInputChange}
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
                                        /> 
                                    </div>
                                  

                                    {(isFocused || isHoveringResults) && searchResults.length > 0 && (
                                        <div
                                            className="search-results"
                                            onMouseEnter={() => setIsHoveringResults(true)}
                                            onMouseLeave={() => setIsHoveringResults(false)}
                                        >
                                            <ul className="search-result__list">
                                                {searchResults.map((result, index) => {
                                                        // Проверяем, есть ли товар в корзине
                                                        let cartItems = [];
                                                        const cartData = localStorage.getItem("cart");
                                                        if (cartData) {
                                                            try {
                                                                cartItems = JSON.parse(cartData);
                                                            } catch (error) {
                                                                console.error("Ошибка парсинга cart:", error);
                                                            }
                                                        }

                                                        const isInCart = cartItems.some(item => item.vendorCode === result.vendorCode);

                                                        return (
                                                            <li key={index} className="search-result__item">
                                                                {/* <div className="search-result-item__info" onClick={() => GoToPageComp(result.linkPage)}> */}
                                                                <div className="search-result-item__info" onClick={() => GoToPageComponent(result.vendorCode)}>
                                                                    {result.vendorCode} - {result.name}
                                                                </div>
                                                                <button
                                                                    className={`search-result-item__add-button ${isInCart ? 'in-cart' : ''}`}
                                                                    onClick={() => handleAddToBasket(result, countBasketItems, setNotificationText, setShowNotification)}
                                                                >
                                                                    {isInCart ? 'В корзине' : 'В корзину'}
                                                                </button>
                                                            </li>
                                                        );
                                                    })}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="header-basket-block">
                            <div className="header-basket-block__icon header-basket-block__lk" onClick={companyDashboard}></div>
                            <div className="header-basket-block__icon header-basket-block__orders" onClick={orderPage}></div>
                            <div className="header-basket-block__icon header-basket-block__basket" onClick={basketPage}></div>
                            <div className={itemBasketIcon}>{itemBasket}</div>
                        </div>
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
export default HeaderGuest;