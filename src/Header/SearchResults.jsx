import React, { useState, useEffect } from 'react';
import ApiUrl from '../js/ApiUrl.js';
import Header from './Header.jsx';
import './searchResults.css';
import DirectoryGroups from "../Home/DirectoryGroups.jsx"
import Footer from "../Footer/Footer.jsx";


/// Получет артикул товара, делает запрос на сервер и формирует карточку товара

const SearchResults = () => {
    // Cчитываем артикул товара который хотим открыть
    const vendorCode = localStorage.getItem("vendorCode_GoToPageComponent");

    console.log(vendorCode);

    const [component, SetComponent] = useState([]);
   
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
        
    const [items, setItems] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const isInBasket = (index) => basket.some(item => item.vendorCode === items[index].vendorCode);
    
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

    // Пагинация
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8); // по умолчанию 8 на странице

     // Пагинация
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    // const totalPages = Math.ceil(items.length / itemsPerPage);


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
        if (newQuantities[index] > 0) newQuantities[index]--;
        setQuantities(newQuantities);
    };

    // Делаем запрос в базу данным и достаем данные о товаре
    fetch(`${ApiUrl}/api/BasketItem/${vendorCode}`, {
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
                    SetComponent({
                        id: item.Id,
                        guidId: item.Guid,
                        vendorCode: item.VendorCode,
                        nameComponent: item.NameComponent || "Нет данных",
                        productDescription: item.productDescription,
                        linkPage: item.linkPage || "",
                        price: item.Price || 0,
                        quantity: 1,
                        imageCard: item.ImgLinkIconCard || "",
                    });
                }
            })
            .catch((err) => console.log("Ошибка получения данных:", err));

    return (
        <>
            <Header />
            <DirectoryGroups />
            <div className="container search-results__container">
                {component && (
                    <div className="card-component" key={component.id}>
                        <div className="card-component__top">
                            <img
                                src={component.imageCard}
                                className="card-component__img"
                                alt={component.nameComponent || "Фото компонента"}
                            />
                            <div className="card-component__vendor">{component.vendorCode}</div>
                            <div
                                className="card-component__name"
                                onClick={() => window.open(component.linkPage, "_blank")}
                            >
                                {component.nameComponent}
                            </div>
                        </div>

                        <div className="card-component__bottom">
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
                                    <div
                                        className="quantity-item__minus"
                                        onClick={() => handleDecrement(0)}
                                    >
                                        −
                                    </div>
                                    <div className="quantity-item__input">{quantities[0]}</div>
                                    <div
                                        className="quantity-item__plus"
                                        onClick={() => handleIncrement(0)}
                                    >
                                        +
                                    </div>
                                </div>
                                <button
                                    className={`basket-block__button ${
                                        isInBasket(0) ? "added" : ""
                                    } ${quantities[0] === 0 ? "disabled" : ""}`}
                                    disabled={quantities[0] === 0}
                                    onClick={() => handleAddToBasket(0)}
                                >
                                    {isInBasket(0) ? "В корзине" : "В корзину"}
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