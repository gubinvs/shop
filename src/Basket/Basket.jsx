import React, { useState, useEffect } from "react";
import Header from "../Header/Header.jsx";
import "./Basket.css";
import Cart from "./Cart.jsx";
import ApiUrl from '../js/ApiUrl.js';

const Basket = () => {
    const [fullBasket, setFullBasket] = useState([]);
    const [newItem, setNewItem] = useState(null);

    const param = new URLSearchParams(window.location.search).get("vendorCode");

    const getParsedLocalStorage = (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : [];
        } catch (error) {
            console.error(`Ошибка парсинга ${key}:`, error);
            localStorage.removeItem(key);
            return [];
        }
    };


    const cardItem = getParsedLocalStorage("cart");
    const searchItem = getParsedLocalStorage("search");

    // Загружаем товар по vendorCode из URL
    useEffect(() => {
        if (!param) return;

        fetch(`${ApiUrl}/api/BasketItem/${param}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => {

                
                if (data.length > 0) {
                    const item = data[0];
                    setNewItem({
                        id: item.Id + 1000,
                        guidId: item.Guid,
                        vendorCode: item.VendorCode,
                        name: item.NameComponent,
                        price: item.Price || 0,
                        quantity: 1,
                        image: item.ImgLinkIconCard || "",
                    });
                }
            })
            .catch(err => console.log("Ошибка получения данных:", err));
    }, [param]);

    // Обновляем корзину при добавлении нового товара
    useEffect(() => {
        if (!newItem) return;

        const basket = getParsedLocalStorage("basketItem");
        const updatedBasket = [...basket, newItem];

        // Убираем дубли по guidId
        const uniqueItems = Array.from(
            new Map(updatedBasket.map(item => [item.guidId, item])).values()
        );

        setFullBasket(uniqueItems);
        localStorage.setItem("basketItem", JSON.stringify(uniqueItems));
    }, [newItem]);

    // Формируем объединённую корзину из cart и search
    const processedCard = cardItem.map(c => ({
        id: c.id + 2000,
        guidId: c.guidId,
        vendorCode: c.vendorCode,
        name: c.nameComponent,
        price: c.price || 0,
        quantity: c.quantity || 1,
        image: c.basketImgPath || "",
    }));

    const processedSearch = searchItem.map(x => ({
        id: x.id + 3000,
        guidId: x.guidId,
        vendorCode: x.vendorCode,
        name: x.name,
        price: x.price || 0,
        quantity: x.quantity || 1,
        image: x.basketImgPath || "",
    }));

    // Финальная корзина
    const combinedItems = [...fullBasket, ...processedCard, ...processedSearch];

    // Сохраняем в localStorage
    useEffect(() => {
        localStorage.setItem("basketItem", JSON.stringify(combinedItems));
    }, [combinedItems]);

    return (
        <>
            <Header />  
            <Cart item={combinedItems} />
        </>
    );
};

export default Basket;

