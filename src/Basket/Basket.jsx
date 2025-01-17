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

    // Отправляем артикул в базу данных, для получения информации о товаре
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
                // Предполагаем, что данные — это массив
                const item = data[0]; // Возьмем первый элемент, если он один
                setNewItem({
                    // Прибавил 1000 для того, 
                    // чтобы комплектующее при добавлении из самого магазина на них будет другой запрос в базу не дублировались, 
                    // данные о них будут браться из localStorage("componentItem") 
                    // к комплектующим например iek буду прибавлять 2000
                    id: item.Id+1000, 
                    guidId: item.GuidId,
                    vendorCode: item.VendorCode,
                    name: item.Name,
                    price: item.PriceNku,
                    quantity: 1,
                    image: item.ImagesLink
                });
            })
            .catch((error) => console.log(error));
        }
    }, [param]);

    // Обновление корзины при изменении newItem
    useEffect(() => {
        if (newItem) {
            // Получаем товары из localStorage
            const basketItemString = localStorage.getItem("basketItem");
            const basketItem = basketItemString ? JSON.parse(basketItemString) : [];

            // Обновляем корзину
            const updatedBasket = [...basketItem, newItem];

            // Удаляем дубликаты по id
            const uniqueItems = Array.from(
                new Map(updatedBasket.map((item) => [item.id, item])).values()
            );

            // Сохраняем уникальные элементы в состояние и localStorage
            setFullBasket(uniqueItems);
            localStorage.setItem("basketItem", JSON.stringify(uniqueItems));
        }
    }, [newItem]);

    // Получение корзины из localStorage
    const item = JSON.parse(localStorage.getItem("basketItem")) || [];

    return (
        <>
            <Header />
            <Cart item={item} />
        </>
    );
};

export default Basket;
