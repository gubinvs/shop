import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './CardComponetGroop.css';




/// Отличие данного компонента от CardComponetGroop в том, 
// что он берет статические данные о номенклатуре и фильтрует ее в зависимости от раздела

const CardComponetGroopLocalData = (param) => {
    const [items, setItems] = useState([]);
    const location = useLocation();
    const [filterItems, setFilterItems] = useState([]); // для фильтрации по производителям
    const [quantities, setQuantities] = useState([]);
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
    const [loading, setLoading] = useState(true);

    // Состояния кнопок переключателей загрузки предложений производителей
    const [stateSwitchKeaz, setStateSwitchKeaz] = useState(true);
    const editStateSwitch = () => {
        if (stateSwitchKeaz === true) {
            setStateSwitchKeaz(false);
        } else {
            setStateSwitchKeaz(true);
        }
    };


    // Пагинация
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8); // по умолчанию 8 на странице

    // Фильтруем данные по производителю "KEAZ"
    useEffect(() => {
        if (stateSwitchKeaz) {
            setFilterItems(items);
        } else {
            const filter = items.filter(item => item.manufacturer !== "KEAZ");
            setFilterItems(filter);
        }
        }, [stateSwitchKeaz, items]);

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

    const isInBasket = (index) => basket.some(item => item.vendorCode === items[index].vendorCode);

    // Пагинация
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filterItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
    const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

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
                {currentItems.map((element, index) => {
                    const globalIndex = indexOfFirstItem + index; // ⚡ корректный глобальный индекс

                    return (
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
                                        <div className="quantity-item__minus" onClick={() => handleDecrement(globalIndex)}>−</div>
                                        <div className="quantity-item__input">{quantities[globalIndex]}</div>
                                        <div className="quantity-item__plus" onClick={() => handleIncrement(globalIndex)}>+</div>
                                    </div>
                                    <button
                                        className={`basket-block__button ${isInBasket(globalIndex) ? "added" : ""} ${quantities[globalIndex] === 0 ? "disabled" : ""}`}
                                        disabled={quantities[globalIndex] === 0}
                                        onClick={() => handleAddToBasket(globalIndex)}
                                    >
                                        {isInBasket(globalIndex) ? "В корзине" : "В корзину"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Пагинация */}
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
