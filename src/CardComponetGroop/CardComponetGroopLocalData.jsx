import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './CardComponetGroop.css';

const CardComponetGroopLocalData = ({ h2, nomenclature }) => {
    const location = useLocation();

    const [stateSwitchKeaz, setStateSwitchKeaz] = useState(true);
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

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);

    // --- Фильтруем элементы один раз через useMemo ---
    const filteredItems = useMemo(() => {
        return stateSwitchKeaz
            ? nomenclature
            : nomenclature.filter(item => item.manufacturer !== "KEAZ");
    }, [nomenclature, stateSwitchKeaz]);

    // --- Элементы текущей страницы ---
    const currentItems = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredItems.slice(start, end);
    }, [filteredItems, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    // --- Пагинация ---
    const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(prev => prev - 1); };
    const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(prev => prev + 1); };

    // --- Корзина ---
    const handleAddToBasket = (product, quantity) => {
        if (quantity <= 0) return;
        setBasket(prev => {
            const idx = prev.findIndex(item => item.vendorCode === product.vendorCode);
            if (idx !== -1) {
                const updated = [...prev];
                updated[idx].quantity = quantity;
                return updated;
            } else {
                return [...prev, { ...product, quantity }];
            }
        });
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(basket));
    }, [basket]);

    // --- Локальный стейт для количеств на текущей странице ---
    const [quantities, setQuantities] = useState(() => currentItems.map(() => 0));

    useEffect(() => {
        // Сброс количеств при смене страницы
        setQuantities(currentItems.map(() => 0));
    }, [currentItems]);

    const handleIncrement = (index) => {
        const newQ = [...quantities];
        newQ[index]++;
        setQuantities(newQ);
    };

    const handleDecrement = (index) => {
        const newQ = [...quantities];
        if (newQ[index] > 0) newQ[index]--;
        setQuantities(newQ);
    };

    const editStateSwitch = () => {
        setStateSwitchKeaz(prev => !prev);
        setCurrentPage(1); // Сбрасываем на первую страницу при фильтре
    };

    const isInBasket = (product) => basket.some(item => item.vendorCode === product.vendorCode);

    console.log("CardComponetGroopLocalData" + nomenclature);
    return (
        <div className="card-componet-groop-section">
            <div className="container">
                <h2 className="directory-groups__title">{h2}</h2>

                {location.pathname !== '/' && (
                    <div className="directory-groups__filter-block">
                        <img
                            className="dg-filter-block__img-icon"
                            src={stateSwitchKeaz ? '/images/icon-switch__on.svg' : '/images/icon-switch__of.svg'}
                            alt="Переключатель"
                            onClick={editStateSwitch}
                        />
                        <img
                            className="dg-filter-block__img-prod"
                            src="/images/logo-keaz__min.png"
                            alt="KEAZ"
                        />
                    </div>
                )}
            </div>

            <div className="container card-componet-groop-section__container">
                {currentItems.map((element, index) => (
                    <div className="card-component" key={element.vendorCode}>
                        <div className="card-component__top">
                            <img src={element.imgLinkIconCard} className="card-component__img" alt={element.nameComponent || "Фото компонента"} />
                            <div className="card-component__vendor">{element.vendorCode}</div>
                            <div className="card-component__name" onClick={() => window.open(element.linkPage, "_blank")}>
                                {element.nameComponent}
                            </div>
                        </div>

                        <div className="card-component__bottom">
                            <div className="cc-basket-block__delivry-block">
                                <div className={element.quantity === 0 ? "delivry-block__quantity delivry-block__quantity_0" : "delivry-block__quantity"}>
                                    {element.quantity === 0 ? "Под заказ" : `Наличие: ${element.quantity} шт.`}
                                </div>
                            </div>

                            <div className="card-component__price-block">
                                <div className="card-component__price">
                                    {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 }).format(element.price)}
                                </div>
                                <div className="card-component__price-nalog">в т.ч. НДС</div>
                            </div>

                            <div className="card-component__basket-block">
                                <div className="basket-block__quantity-item">
                                    <div className="quantity-item__minus" onClick={() => handleDecrement(index)}>−</div>
                                    <div className="quantity-item__input">{quantities[index]}</div>
                                    <div className="quantity-item__plus" onClick={() => handleIncrement(index)}>+</div>
                                </div>
                                <button
                                    className={`basket-block__button ${isInBasket(element) ? "added" : ""} ${quantities[index] === 0 ? "disabled" : ""}`}
                                    disabled={quantities[index] === 0}
                                    onClick={() => handleAddToBasket(element, quantities[index])}
                                >
                                    {isInBasket(element) ? "В корзине" : "В корзину"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button className="pagination__button" onClick={handlePrevPage} disabled={currentPage === 1}>Предыдущая</button>
                    <span className="pagination__info"> Страница {currentPage} из {totalPages} </span>
                    <button className="pagination__button" onClick={handleNextPage} disabled={currentPage === totalPages}>Следующая</button>
                    <select className="pagination__select" value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                        <option value={8}>8 на странице</option>
                        <option value={12}>12 на странице</option>
                        <option value={16}>16 на странице</option>
                        <option value={20}>20 на странице</option>
                    </select>
                </div>
            )}
        </div>
    );
};

export default CardComponetGroopLocalData;
