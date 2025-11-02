import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './CardComponetGroop.css';

const CardComponetGroopLocalData = ({ h2, item}) => {
    const location = useLocation();
    const chapter = new URLSearchParams(location.search).get("chapter");

    // Основные состояния
    const [items, setItems] = useState([]);
    const [filterItems, setFilterItems] = useState([]);
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

    // Состояние переключателя KEAZ
    const [stateSwitchKeaz, setStateSwitchKeaz] = useState(true);
    const toggleSwitchKeaz = () => setStateSwitchKeaz(prev => !prev);
    
    // Состояние переключателя EKF
    // const [stateSwitchEkf, setStateSwitchEkf] = useState(false);
    // const toggleSwitchEkf = () => setStateSwitchEkf(prev => !prev);

    // Состояние переключателя IEK
    // const [stateSwitchIek, setStateSwitchIek] = useState(false);
    // const toggleSwitchIek = () => setStateSwitchIek(prev => !prev);

    // Состояние переключателя CHINT
    // const [stateSwitchChint, setStateSwitchChint] = useState(false);
    // const toggleSwitchChint = () => setStateSwitchChint(prev => !prev);

    // Состояние переключателя SCHNAIDER
    const [stateSwitchShnaider, setStateSwitchShnaider] = useState(true);
    const toggleSwitchShnaider = () => setStateSwitchShnaider(prev => !prev);

     // Состояние переключателя PHOENIX
    const [stateSwitchPhoenix, setStateSwitchPhoenix] = useState(true);
    const toggleSwitchPhoenix = () => setStateSwitchPhoenix(prev => !prev);

    // Пагинация
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);

    // -----------------------
    // Синхронизация пропса nomenclature
    useEffect(() => {
        if (item && item.length > 0) {
            setItems(item);
        }
    }, [item]);

    // Инициализация количеств
    useEffect(() => {
        if (items.length > 0) {
            setQuantities(items.map(() => 0));
            setLoading(false);
        }
    }, [items]);

    useEffect(() => {
        const normalizedChapter = chapter?.trim();

        let filtered = items;

        // фильтр по наменованию раздела каталога (chapter)
        if (normalizedChapter) {
            filtered = filtered.filter(i => i.chapter === normalizedChapter);
        }

        // фильтр по производителю KEAZ
        if (!stateSwitchKeaz) {
            filtered = filtered.filter(i => i.manufacturer !== "KEAZ");
        }

        // фильтр по производителю SCHAIDER
        if (!stateSwitchShnaider) {
            filtered = filtered.filter(i => i.manufacturer !== "Schneider Electric");
        }

        // фильтр по производителю PHOENIX
        if (!stateSwitchPhoenix) {
            filtered = filtered.filter(i => i.manufacturer !== "PHOENIX CONTACT");
        }

        setFilterItems(filtered);
        setCurrentPage(1);
    }, [items, chapter, stateSwitchKeaz, stateSwitchShnaider, stateSwitchPhoenix]);

    // Сохраняем корзину
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(basket));
    }, [basket]);


    // -----------------------
    // Работа с корзиной
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
        const product = filterItems[index];
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

    const isInBasket = (index) => basket.some(item => item.vendorCode === filterItems[index].vendorCode);

    // -----------------------
    // Пагинация
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filterItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filterItems.length / itemsPerPage);

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

    // -----------------------
    // Рендер
    return (
        <div className="card-componet-groop-section">
            <div className="container">
                <h2 className="directory-groups__title">{h2}</h2>

                {location.pathname !== '/' && (
                    <>
                        <div className="switch-block">
                            {/* // Переключатель КЭАЗ */}
                            <div className="directory-groups__filter-block">
                                <img
                                    className="dg-filter-block__img-icon"
                                    src={stateSwitchKeaz ? '/images/icon-switch__on.svg' : '/images/icon-switch__of.svg'}
                                    alt="Переключатель"
                                    onClick={toggleSwitchKeaz}
                                />
                                <img
                                    className="dg-filter-block__img-prod"
                                    src="/images/logo-keaz__min.png"
                                    alt="KEAZ"
                                />
                            </div>
                            {/* // Переключатель EKF */}
                            {/* <div className="directory-groups__filter-block">
                                <img
                                    className="dg-filter-block__img-icon"
                                    src={stateSwitchEkf ? '/images/icon-switch__on.svg' : '/images/icon-switch__of.svg'}
                                    alt="Переключатель"
                                    onClick={toggleSwitchEkf}
                                />
                                <img
                                    className="dg-filter-block__img-prod"
                                    src="/images/logo-ekf__min.png"
                                    alt="KEAZ"
                                />
                            </div> */}
                            {/* // Переключатель IEK */}
                            {/* <div className="directory-groups__filter-block">
                                <img
                                    className="dg-filter-block__img-icon"
                                    src={stateSwitchIek ? '/images/icon-switch__on.svg' : '/images/icon-switch__of.svg'}
                                    alt="Переключатель"
                                    onClick={toggleSwitchIek}
                                />
                                <img
                                    className="dg-filter-block__img-prod"
                                    src="/images/logo-iek__min.png"
                                    alt="KEAZ"
                                />
                            </div> */}
                            {/* // Переключатель CHINT */}
                            {/* <div className="directory-groups__filter-block">
                                <img
                                    className="dg-filter-block__img-icon"
                                    src={stateSwitchChint ? '/images/icon-switch__on.svg' : '/images/icon-switch__of.svg'}
                                    alt="Переключатель"
                                    onClick={toggleSwitchChint}
                                />
                                <img
                                    className="dg-filter-block__img-prod"
                                    src="/images/logo-chint__min.png"
                                    alt="KEAZ"
                                />
                            </div> */}
                            {/* // Переключатель SHNAIDER */}
                            <div className="directory-groups__filter-block">
                                <img
                                    className="dg-filter-block__img-icon"
                                    src={stateSwitchShnaider ? '/images/icon-switch__on.svg' : '/images/icon-switch__of.svg'}
                                    alt="Переключатель"
                                    onClick={toggleSwitchShnaider}
                                />
                                <img
                                    className="dg-filter-block__img-prod"
                                    src="/images/logo-shnaider__min.png"
                                    alt="SHNAIDER"
                                />
                            </div>
                            {/* // Переключатель PHOENIX */}
                            <div className="directory-groups__filter-block">
                                <img
                                    className="dg-filter-block__img-icon"
                                    src={stateSwitchPhoenix ? '/images/icon-switch__on.svg' : '/images/icon-switch__of.svg'}
                                    alt="Переключатель"
                                    onClick={toggleSwitchPhoenix}
                                />
                                <img
                                    className="dg-filter-block__img-prod"
                                    src="/images/logo-phoenix__min.jpg"
                                    alt="phoenix"
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="container card-componet-groop-section__container">
                {currentItems.map((element, idx) => {
                    const globalIndex = indexOfFirstItem + idx;
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

            {totalPages > 1 && (
                <div className="pagination">
                    <button className="pagination__button" onClick={handlePrevPage} disabled={currentPage === 1}>Предыдущая</button>
                    <span className="pagination__info">Страница {currentPage} из {totalPages}</span>
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
