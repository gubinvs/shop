import React, { useState, useEffect } from "react";
import Header from "../Header/Header.jsx";
import "./Basket.css";
import Cart from "./Cart.jsx";
import ApiUrl from '../js/ApiUrl.js';

const Basket = () => {
    const [fullBasket, setFullBasket] = useState([]);
    const [newItem, setNewItem] = useState(null);

    // Получаем артикул из строки запроса
    const param = new URLSearchParams(window.location.search).get("vendorCode");

    // Получаем данные из localStorage с безопасным парсингом
    const getParsedLocalStorage = (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : [];
        } catch (error) {
            console.error(`Ошибка парсинга ${key}:`, error);
            localStorage.removeItem(key); // очищаем поврежденный ключ
            return [];
        }
    };

    const nkuItem = getParsedLocalStorage("basketItem");
    const cardItem = getParsedLocalStorage("cart");
    const searchItem = getParsedLocalStorage("search");

    // Получаем товар по vendorCode из URL
    useEffect(() => {
        if (param) {
            fetch(ApiUrl + "/api/BasketItem/" + param, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    
                    return response.json();
                })
                .then((data) => {
                    
                    if (data.length > 0) {
                        const item = data[0];
                        setNewItem({
                            id: item.Id + 1000,
                            guidId: item.GuidId || item.Guid,
                            vendorCode: item.VendorCode,
                            name: item.Name || item.NameComponent,
                            price: item.PriceNku || item.Price,
                            quantity: 1,
                            image: item.ImagesLink || item.ImgLinkIconCard
                        });
                    }
                })
                .catch((error) => console.log("Ошибка получения данных:", error));
        }
    }, [param]);

    // Обновляем корзину при добавлении нового товара
    useEffect(() => {
        if (newItem) {
            const basketItem = getParsedLocalStorage("basketItem");

            const updatedBasket = [...basketItem, newItem];
            const uniqueItems = Array.from(
                new Map(updatedBasket.map((item) => [item.id, item])).values()
            );

            setFullBasket(uniqueItems);
            localStorage.setItem("basketItem", JSON.stringify(uniqueItems));
        }
    }, [newItem]);

    // Обработка элементов из localStorage
    const processedNku = nkuItem.map(i => ({
        id: i.id,
        guidId: i.guidId,
        vendorCode: i.vendorCode,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: i.image
    }));

    const processedCard = cardItem.map(c => ({
        id: c.id + 2000,
        guidId: c.guidId,
        vendorCode: c.vendorСode,
        name: c.nameComponent,
        price: c.price,
        quantity: c.quantity,
        image: c.basketImgPath
    }));

    const processedSearch = searchItem.map(x => ({
        id: x.id + 3000,
        guidId: x.guidId,
        vendorCode: x.vendorCode,
        name: x.name,
        price: x.price,
        quantity: x.quantity,
        image: x.basketImgPath
    }));

    const combinedItems = [...processedNku, ...processedCard, ...processedSearch];

    return (
        <>
            <Header />
            <Cart item={combinedItems} />
        </>
    );
};

export default Basket;
