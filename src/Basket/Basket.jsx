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
                const item = data[0]; // Возьмем первый элемент, если он один
                setNewItem({
                    id: item.Id + 1000, 
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
            const basketItemString = localStorage.getItem("basketItem");
            const basketItem = basketItemString ? JSON.parse(basketItemString) : [];

            const updatedBasket = [...basketItem, newItem];
            const uniqueItems = Array.from(
                new Map(updatedBasket.map((item) => [item.id, item])).values()
            );

            setFullBasket(uniqueItems);
            localStorage.setItem("basketItem", JSON.stringify(uniqueItems));
        }
    }, [newItem]);

    // Получение корзины из localStorage - НКУ
    const item = JSON.parse(localStorage.getItem("basketItem")) || [];

    // Данные о товарах в корзине - комплектующие
    const comp = JSON.parse(localStorage.getItem("cart")) || [];


    // Обработка и объединение элементов через map
    const processedItem = item.map(i => ({
        id: i.id,
        guidId: i.guidId,
        vendorCode: i.vendorCode,
        name: i.name, // Если нужно изменить название, можно здесь скорректировать
        price: i.price,
        quantity: i.quantity,
        image: i.image
    }));

    const processedComp = comp.map(c => ({
        id: c.id + 2000, // Здесь можно прибавить к id, если нужно
        guidId: c.guidId,
        vendorCode: c.vendorСode,
        name: c.nameComponent, // Например, если название в комплектующих — это 'title'
        price: c.price,
        quantity: c.quantity,
        image: c.basketImgPath // Если в комплектующих используется другой ключ для изображения
    }));

    // Объединяем обработанные массивы
    const combinedItems = [...processedItem, ...processedComp];

    return (
        <>
            <Header />
            {/* Выводит информацию по добавленным в корзину НКУ и комплектующим */}
            <Cart item={combinedItems} />
        </>
    );
};

export default Basket;

