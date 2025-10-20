import React, { useState, useEffect, useMemo } from "react";
import Header from "../Header/Header.jsx";
import "./Basket.css";
import Cart from "./Cart.jsx";
import ApiUrl from "../js/ApiUrl.js";

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

    // Загрузка товара по vendorCode из URL
    useEffect(() => {
        if (!param) return;

        fetch(`${ApiUrl}/api/BasketItem/${param}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then((data) => {
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
            .catch((err) => console.log("Ошибка получения данных:", err));
    }, [param]);

    // Добавление нового товара в basketItem
    useEffect(() => {
        if (!newItem) return;

        const basket = getParsedLocalStorage("basketItem");
        const updatedBasket = [...basket, newItem];

        // Убираем дубли по guidId
        const uniqueItems = Array.from(
            new Map(updatedBasket.map((item) => [item.guidId, item])).values()
        );

        setFullBasket(uniqueItems);
        localStorage.setItem("basketItem", JSON.stringify(uniqueItems));
    }, [newItem]);

    // Загружаем текущую корзину при монтировании
    useEffect(() => {
        const savedBasket = getParsedLocalStorage("basketItem");
        setFullBasket(savedBasket);
    }, []);

    // Объединяем все источники для отображения (но не сохраняем)
    const combinedItems = useMemo(() => {
        const allItems = [
            ...fullBasket,
            ...cardItem.map((c) => ({
                id: c.id + 2000,
                guidId: c.guidId,
                vendorCode: c.vendorCode,
                name: c.nameComponent || c.name || "Без названия",
                price: c.price || 0,
                quantity: c.quantity || 1,
                image: c.basketImgPath || "",
            })),
            ...searchItem.map((x) => ({
                id: x.id + 3000,
                guidId: x.guidId,
                vendorCode: x.vendorCode,
                name: x.nameComponent || x.name || "Без названия",
                price: x.price || 0,
                quantity: x.quantity || 1,
                image: x.basketImgPath || "",
            })),
        ];

        // Убираем дубли по guidId
        return Array.from(new Map(allItems.map((i) => [i.guidId, i])).values());
    }, [fullBasket, cardItem, searchItem]);

    console.log("combinedItems:", combinedItems);

    return (
        <>
            <Header />
            <Cart item={combinedItems} />
        </>
    );
};

export default Basket;

