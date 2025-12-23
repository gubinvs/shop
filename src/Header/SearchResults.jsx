import React, { useState, useEffect } from 'react';
import ApiUrl from '../js/ApiUrl.js';
import Header from './Header.jsx';
import './searchResults.css';
import DirectoryGroups from "../Home/DirectoryGroups.jsx"
import Footer from "../Footer/Footer.jsx";

const SearchResults = () => {
    // Сначала получаем vendorCode из URL, если он есть
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const vendorCodeFromUrl = urlParams.get("vendorCode");
        if (vendorCodeFromUrl) {
            localStorage.setItem("vendorCode_GoToPageComponent", vendorCodeFromUrl);
        }
    }, []);
    
    // Теперь можно безопасно читать из localStorage
    const vendorCode = localStorage.getItem("vendorCode_GoToPageComponent");
    const [component, setComponent] = useState(null);
    const [basket, setBasket] = useState(() => {
        const fromCart = JSON.parse(localStorage.getItem('cart')) || [];
        const fromSearch = JSON.parse(localStorage.getItem('search')) || [];
        const merged = [...fromCart, ...fromSearch];
        const unique = merged.filter(
            (v, i, a) => a.findIndex(t => t.vendorCode === v.vendorCode) === i
        );
        localStorage.setItem('cart', JSON.stringify(unique));
        return unique;
    });
    const [quantity, setQuantity] = useState(1);

    // Загружаем данные товара
    useEffect(() => {
        if (!vendorCode) return;

        fetch(`${ApiUrl}/api/BasketItem/${vendorCode}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        })
        .then(data => {

            // console.log(JSON.stringify(data));
            
            if (data.length > 0) {
                const item = data[0];
                setComponent({
                    id: item.Id,
                    guidId: item.Guid,
                    vendorCode: item.VendorCode,
                    nameComponent: item.NameComponent || "Нет данных",
                    productDescription: item.ProductDescription,
                    manufacturer: item.Manufacturer,
                    linkPage: item.LinkPage || "",
                    price: item.Price || 0,
                    quantity: item.Quantity,
                    imageCard: item.ImgLinkIconCard || "",
                });
            }
        })
        .catch(err => console.log("Ошибка получения данных:", err));
    }, [vendorCode]);



    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(basket));
    }, [basket]);

    const handleAddToBasket = () => {
        if (!component || quantity <= 0) return;

        const existingIndex = basket.findIndex(item => item.vendorCode === component.vendorCode);
        const newBasket = [...basket];

        if (existingIndex !== -1) {
            newBasket[existingIndex].quantity = quantity;
        } else {
            newBasket.push({
                vendorCode: component.vendorCode,
                nameComponent: component.nameComponent,
                quantity: component.quantity,
                price: component.price,
                basketImgPath: component.imageCard,
                guidId: component.guidId,
                id: component.id
            });
        }

        // console.log(JSON.stringify(component.quantity));

        setBasket(newBasket);
    };

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0));

    const isInBasket = () => component && basket.some(item => item.vendorCode === component.vendorCode);
    
    const normalizeManufacturer = (name = "") => {
        const upper = name.toUpperCase();

        if (upper.includes("KEAZ")) return "KEAZ";
        if (upper.includes("SCHNEIDER ELECTRIC")) return "SCHNEIDER";
        if (upper.includes("PHOENIX CONTACT")) return "PHOENIX";
        if (upper.includes("КОМПОНЕНТ ЭНЕРГИИ")) return "ENERGY";

        return null;
    };

    const logos = {
        KEAZ: "../images/logo-keaz.png",
        SCHNEIDER: "../images/logo-shnaider__min.png",
        PHOENIX: "../images/logo-phoenix__min.jpg",
        ENERGY: "../images/header_logo_1280.svg",
    };

    const key = component ? normalizeManufacturer(component.manufacturer) : null;
    const logo = key ? logos[key] : null;

    return (
        <>
            <Header />
            <DirectoryGroups />
            <div className="container search-results__container">
                {component && (
                    <div className="search-results__card-component" key={component.id}>
                        <div className="card-component__top">
                            <img
                                src={component.imageCard}
                                className="card-component__img sr-card-component__img"
                                alt={component.nameComponent || "Фото компонента"}
                            />
                            <div className="sr-card-component__vendor"><p className=''>Артикул: </p> {component.vendorCode}</div>
                            <div
                                className="card-component__name sr-card-component__name"
                                onClick={() => window.open(component.linkPage, "_blank")}
                            >
                                {component.nameComponent}
                            </div>
                        </div>

                        <div className="card-component__bottom">
                            <div className="sr-card-component-bottom__discription">  
                                <div className="sccb-discription__logo">
                                    {logo && (
                                        <img
                                            src={logo}
                                            alt={`Логотип ${component.manufacturer}`}
                                            className="sccb-discription-lm__img"
                                        />
                                    )}
                                </div>
                                <div className="sccb-discription__title">
                                    Описание товара:
                                </div>
                                <div className="sccb-discription__discription">
                                    {component.productDescription}
                                    <br/><br/>
                                    <b><a href={component.linkPage}>Подробнее на странице товара ...</a></b>
                                </div>
                                
                            </div>
                            <div className="cc-basket-block__delivry-block">
                                <div
                                    className={
                                        component.quantity === 0
                                            ? "delivry-block__quantity delivry-block__quantity_0"
                                            : "delivry-block__quantity"
                                    }
                                >
                                    {component.quantity === 0
                                        ? "Под заказ"
                                        : `Наличие: ${component.quantity} шт.`}
                                </div>
                            </div>

                            <div className="card-component__price-block">
                                <div className="card-component__price">
                                    {new Intl.NumberFormat("ru-RU", {
                                        style: "currency",
                                        currency: "RUB",
                                        minimumFractionDigits: 0,
                                    }).format(component.price)}
                                </div>
                                <div className="card-component__price-nalog">в т.ч. НДС</div>
                            </div>
                            <div className="card-component__basket-block">
                                <div className="basket-block__quantity-item">
                                    <div className="quantity-item__minus" onClick={handleDecrement}>−</div>
                                    <div className="quantity-item__input">{quantity}</div>
                                    <div className="quantity-item__plus" onClick={handleIncrement}>+</div>
                                </div>
                                <button
                                    className={`basket-block__button ${isInBasket() ? "added" : ""} ${quantity === 0 ? "disabled" : ""}`}
                                    disabled={quantity === 0}
                                    onClick={handleAddToBasket}
                                >
                                    {isInBasket() ? "В корзине" : "В корзину"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default SearchResults;
