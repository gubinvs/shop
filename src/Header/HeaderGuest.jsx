import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./Header.css";

const HeaderGuest = () => {
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
    
    const [isCatalogVisible, setCatalogVisible] = useState(false);
    const catalogDisplay = () => {
        setCatalogVisible(prev => !prev); // Переключаем состояние
    };
  
    return (
        <>
        <header>
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
                <div className="container header__container">
                    <div className="header-logo-block" onClick={indexPage}>
                        <picture>
                            <source srcSet="../../images/header_logo_1280.svg" media="(max-width: 1280px)"/>
                            <img src="../../images/header_logo_1920.svg" alt="Логотип компании"/>
                        </picture>
                    </div>
                    <div className="header-navigation-block">
                        <div className="header-navigation-block__top header-navigation-block__top_guest">
                              <div className="search-input-block search-input-block_guest">
                
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
                                    <a href="/DeliveryAndPayment" className={
                                                                    location.pathname === '/DeliveryAndPayment' ? 
                                                                    'nav-active' : 
                                                                    ''
                                    }>
                                        Доставка и оплата
                                    </a>
                                </li>
                                <li className="header-navigation__item"><a href="https://encomponent.ru/about.php">Контакты</a></li>
                            </ul>
                        </div>                          
                    </div>
                    <div class="header-navigation-block__top">
                        <div class="header-validation-block header-validation-block__guest">
                            <a href="/Authorization">
                                <div class="button-verification">Вход</div>
                            </a>
                            <a href="/Registration">
                                <div class="button-registrasion">Регистрация</div>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};
export default HeaderGuest;