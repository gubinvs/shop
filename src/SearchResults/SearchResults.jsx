import React, { useState, useEffect } from 'react';
import ApiUrl from '../js/ApiUrl.js';
import Header from '../Header/Header.jsx';
import HeaderGuest from '../Header/HeaderGuest.jsx';
import PageComponent from '../PageComponent/PageComponent.jsx';

import { components } from '../js/components.js';

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

    // По умолчанию установим 1 шт в заказе
    const [quantity, setQuantity] = useState(1);

    // Проверка авторизации пользователя для выдачи хэдера
    const isAuthenticated = localStorage.getItem('token') !== null;

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

    // const handleAddToBasket = () => {
    //     if (!component || quantity <= 0) return;

    //     const existingIndex = basket.findIndex(item => item.vendorCode === component.vendorCode);
    //     const newBasket = [...basket];

    //     if (existingIndex !== -1) {
    //         newBasket[existingIndex].quantity = quantity;
    //     } else {
    //         newBasket.push({
    //             vendorCode: component.vendorCode,
    //             nameComponent: component.nameComponent,
    //             quantity: component.quantity,
    //             price: component.price,
    //             basketImgPath: component.imageCard,
    //             guidId: component.guidId,
    //             id: component.id
    //         });
    //     }

    //     // console.log(JSON.stringify(component.quantity));

    //     setBasket(newBasket);
    // };

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
            {/* ----- Хэдер в зависимости от авторизации ----- */}
            {!isAuthenticated ? <HeaderGuest /> : <Header />}


            {/* -- страница товара */}
            <PageComponent dataComponent={components} />

        </>
    );
};

export default SearchResults;
