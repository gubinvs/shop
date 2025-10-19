import React, { useState, useEffect } from 'react';
import './CardComponetGroop.css';
import ApiUrl from '../js/ApiUrl.js';

const CardComponetGroop = (param) => {
    const [items, setItems] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [basket, setBasket] = useState(() => {
        // 🧠 при первом рендере объединяем cart и search
        const fromCart = JSON.parse(localStorage.getItem('cart')) || [];
        const fromSearch = JSON.parse(localStorage.getItem('search')) || [];

        // объединяем без дубликатов
        const merged = [...fromCart, ...fromSearch];
        const unique = merged.filter(
            (v, i, a) => a.findIndex(t => t.vendorCode === v.vendorCode) === i
        );

        // сохраняем объединённый результат только в cart
        localStorage.setItem('cart', JSON.stringify(unique));
        return unique;
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(ApiUrl + param.api, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then(response => response.json())
            .then(data => {
                const formattedData = data.map(item => ({
                    id: item.id,
                    imgLinkIconCard: item.imgLinkIconCard,
                    vendorCode: item.vendorCode,
                    nameComponent: item.nameComponent,
                    quantity: item.quantity,
                    linkPage: item.linkPage,
                    price: item.price,
                    basketImgPath: item.basketImgPath,
                    guidId: item.guid
                }));

                setItems(formattedData);
                setQuantities(Array(formattedData.length).fill(0));
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
                setLoading(false);
            });
    }, [param.api]);

    // 🔁 синхронизация — теперь только cart
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(basket));
    }, [basket]);

    const handleIncrement = (index) => {
        const newQuantities = [...quantities];
        newQuantities[index]++;
        setQuantities(newQuantities);
    };

    const handleDecrement = (index) => {
        const newQuantities = [...quantities];
        if (newQuantities[index] > 0) {
            newQuantities[index]--;
            setQuantities(newQuantities);
        }
    };

    const handleAddToBasket = (index) => {
        const product = items[index];
        const newBasket = [...basket];
        const existingIndex = newBasket.findIndex(item => item.vendorCode === product.vendorCode);

        if (quantities[index] > 0) {
            if (existingIndex !== -1) {
                newBasket[existingIndex].quantity = quantities[index];
            } else {
                newBasket.push({
                    vendorCode: product.vendorCode,
                    nameComponent: product.nameComponent,
                    quantity: quantities[index],
                    price: product.price,
                    basketImgPath: product.basketImgPath,
                    guidId: product.guidId,
                    id: product.id
                });
            }
            setBasket(newBasket);
        }
    };

    const isInBasket = (index) => {
        return basket.some(item => item.vendorCode === items[index].vendorCode);
    };

    if (loading) {
        return (
            <div className="loading-wrapper">
                <div className="spinner"></div>
                <p>Загрузка данных...</p>
            </div>
        );
    }

    return (
        <div className="card-componet-groop-section">
            <div className="container">
                <h2 className="directory-groups__title">{param.h2}</h2>
            </div>
            <div className="container card-componet-groop-section__container">
                {items.map((element, index) => (
                    <div className="card-component" key={element.vendorCode}>
                        <div className="card-component__top">
                            <img
                                src={element.imgLinkIconCard}
                                className="card-component__img"
                                alt={element.nameComponent || "Фото компонента"}
                            />
                            <div className="card-component__vendor">{element.vendorCode}</div>
                            <div
                                className="card-component__name"
                                onClick={() => window.open(element.linkPage, '_blank')}
                            >
                                {element.nameComponent}
                            </div>
                        </div>
                        <div className="card-component__bottom">
                            <div className="cc-basket-block__delivry-block">
                                <div
                                    className={
                                        element.quantity === 0
                                            ? "delivry-block__quantity delivry-block__quantity_0"
                                            : "delivry-block__quantity"
                                    }
                                >
                                    {element.quantity === 0
                                        ? "Под заказ"
                                        : `Наличие: ${element.quantity} шт.`}
                                </div>
                            </div>

                            <div className="card-component__price-block">
                                <div className="card-component__price">
                                    {new Intl.NumberFormat("ru-RU", {
                                        style: "currency",
                                        currency: "RUB",
                                        minimumFractionDigits: 0
                                    }).format(element.price)}
                                </div>
                                <div className="card-component__price-nalog">в т.ч. НДС</div>
                            </div>

                            <div className="card-component__basket-block">
                                <div className="basket-block__quantity-item">
                                    <div className="quantity-item__minus" onClick={() => handleDecrement(index)}>-</div>
                                    <div className="quantity-item__input">{quantities[index]}</div>
                                    <div className="quantity-item__plus" onClick={() => handleIncrement(index)}>+</div>
                                </div>
                                <button
                                    className={`basket-block__button ${isInBasket(index) ? 'added' : ''} ${quantities[index] === 0 ? 'disabled' : ''}`}
                                    disabled={quantities[index] === 0}
                                    onClick={() => handleAddToBasket(index)}
                                >
                                    {isInBasket(index) ? 'В корзине' : 'В корзину'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardComponetGroop;
