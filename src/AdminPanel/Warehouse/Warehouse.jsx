import "./warehouse.css";
import { useState, useEffect } from "react";
import ApiUrl from "../../js/ApiUrl.js";
import { priceUpdateWebsite } from "../../js/priceUpdateWebsite.js";

const Warehouse = () => {
    const totalTaxes = 1.37;
    const markupShopEncomponent = 1.6;
    const markupOzon = 1.6;

    const [docList, setDocList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 20;

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch(
                    `${ApiUrl}/api/ReturnWarehouseAllItem/MySuperToken123`
                );

                if (!response.ok) {
                    throw new Error("Ошибка запроса: " + response.status);
                }

                const data = await response.json();

                const formattedData = data.map(item => ({
                    id: item.id,
                    guid: item.guid,
                    vendorCode: item.vendorCode,
                    nameComponent: item.nameComponent,
                    quantity: item.quantity,
                    price: item.price,
                    purchaseQuantity: item.purchaseQuantity,
                    averagePurchasePrice: item.averagePurchasePrice,
                    averageSellingPrice: item.averageSellingPrice
                }));

                setDocList(formattedData);
            } catch (err) {
                console.error("Ошибка загрузки склада:", err);
            }
        };

        loadData();
    }, []);

    const totalPages = Math.ceil(docList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentList = docList.slice(startIndex, startIndex + itemsPerPage);

    return (
    
        <>
                <div className="warehouse-main-section__container">
                <h2 className="warehouse-main-section__title">
                    Наличие товара на складе:
                </h2>

                <div className="warehouse-main-section__result-table_header">
                    <div className="wms-result-table__cell wms-result-table__header">Артикул</div>
                    <div className="wms-result-table__cell wms-result-table__header">Наименование</div>
                    <div className="wms-result-table__cell wms-result-table__header">Наличие, шт</div>
                    <div className="wms-result-table__cell wms-result-table__header">В пути, шт</div>
                    <div className="wms-result-table__cell wms-result-table__header">Сред. цена покупки</div>
                    <div className="wms-result-table__cell wms-result-table__header">Сред. цена продажи</div>
                    <div className="wms-result-table__cell wms-result-table__header">Цена на сайте</div>
                    <div className="wms-result-table__cell wms-result-table__header">Цена для сайта</div>
                    <div className="wms-result-table__cell wms-result-table__header "><p className="wms-result-table__header_transform">Обновить</p></div>
                    <div className="wms-result-table__cell wms-result-table__header">Цена для Озон</div>
                    <div className="wms-result-table__cell wms-result-table__header"><p className="wms-result-table__header_transform">Обновить</p></div>
                </div>

                {currentList.map(x => (
                    <div
                        className="warehouse-main-section__result-table_item"
                        key={x.id}
                    >
                        <div className="wms-result-table__cell wms-result-table__item">{x.vendorCode}</div>
                        <div className="wms-result-table__cell wms-result-table__item">{x.nameComponent}</div>
                        <div 
                            className={x.quantity===0? "wms-result-table__cell wms-result-table__item wms-result-table__item_null":"wms-result-table__cell wms-result-table__item"}>
                            {x.quantity}
                        </div>
                        <div className="wms-result-table__cell wms-result-table__item">{x.purchaseQuantity}</div>
                        <div className="wms-result-table__cell wms-result-table__item">
                            {new Intl.NumberFormat("ru-RU", {
                                style: "currency",
                                currency: "RUB",
                                minimumFractionDigits: 0
                            }).format(x.averagePurchasePrice)}
                        </div>
                        <div className="wms-result-table__cell wms-result-table__item">
                            {new Intl.NumberFormat("ru-RU", {
                                style: "currency",
                                currency: "RUB",
                                minimumFractionDigits: 0
                            }).format(x.averageSellingPrice)}
                        </div>
                        <div className="wms-result-table__cell wms-result-table__item">
                            {new Intl.NumberFormat("ru-RU", {
                                style: "currency",
                                currency: "RUB",
                                minimumFractionDigits: 0
                            }).format(x.price)}
                            
                        </div>
                            <div className="wms-result-table__cell wms-result-table__item">
                            {new Intl.NumberFormat("ru-RU", {
                                style: "currency",
                                currency: "RUB",
                                minimumFractionDigits: 0
                            }).format(x.averagePurchasePrice * markupShopEncomponent * totalTaxes)}
                        </div>
                        <div className="wms-result-table__cell wms-result-table__item">
                            <img
                                src="../images/changes.png"
                                alt="@"
                                className="wms-result-table__item_icon"
                                onClick={() =>
                                    priceUpdateWebsite(
                                        x.guid,
                                        x.averagePurchasePrice * markupShopEncomponent * totalTaxes
                                    )
                                }
                            />
                        </div>
                        <div className="wms-result-table__cell wms-result-table__item">
                            {new Intl.NumberFormat("ru-RU", {
                                style: "currency",
                                currency: "RUB",
                                minimumFractionDigits: 0
                            }).format(
                                x.averagePurchasePrice *
                                    markupShopEncomponent *
                                    totalTaxes *
                                    markupOzon
                            )}
                        </div>
                        <div className="wms-result-table__cell wms-result-table__item">
                            <img
                                src="../images/changes.png"
                                alt="@"
                                className="wms-result-table__item_icon"
                            />
                        </div>
                    </div>
                ))}

                {/* Пагинация */}
                <div className="warehouse-main-section__pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                    >
                        ←
                    </button>

                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            className={currentPage === i + 1 ? "active" : ""}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                    >
                        →
                    </button>
                </div>
            </div>
        
            <div className="warehouse-main-section__container economics-section__container">
                <h2 className="warehouse-main-section__title">
                    Экономика магазина:
                </h2>

                <div className="warehouse-main-section__result-table_header wms-result-table__header_economics">
                    <div className="wms-result-table__cell wms-result-table__header">Артикул</div>
                    <div className="wms-result-table__cell wms-result-table__header">Наименование</div>
                    <div className="wms-result-table__cell wms-result-table__header">Всего куплено, шт</div>
                    <div className="wms-result-table__cell wms-result-table__header">Стоимость закупки, руб</div>
                    <div className="wms-result-table__cell wms-result-table__header">Всего продано, шт</div>
                    <div className="wms-result-table__cell wms-result-table__header">Стоимость продажи, руб</div>
                    <div className="wms-result-table__cell wms-result-table__header">Балансовая сумма</div>
                </div>
                {currentList.map(x => (
                    <div
                        className="warehouse-main-section__result-table_item warehouse-main-section__result-table_item_economics"
                        key={x.id}
                    >
                        <div className="wms-result-table__cell wms-result-table__item">{x.vendorCode}</div>
                        <div className="wms-result-table__cell wms-result-table__item">{x.nameComponent}</div>
                        <div className="wms-result-table__cell wms-result-table__item"></div>
                        <div className="wms-result-table__cell wms-result-table__item">
                            {new Intl.NumberFormat("ru-RU", {
                                style: "currency",
                                currency: "RUB",
                                minimumFractionDigits: 0
                            }).format(x.averagePurchasePrice)}
                        </div>
                        <div className="wms-result-table__cell wms-result-table__item"></div>
                        <div className="wms-result-table__cell wms-result-table__item">
                            {new Intl.NumberFormat("ru-RU", {
                                style: "currency",
                                currency: "RUB",
                                minimumFractionDigits: 0
                            }).format(x.price)}
                            
                        </div>
                        <div className="wms-result-table__cell wms-result-table__item">
                            {new Intl.NumberFormat("ru-RU", {
                                style: "currency",
                                currency: "RUB",
                                minimumFractionDigits: 0
                            }).format(x.averagePurchasePrice * markupShopEncomponent * totalTaxes)}
                        </div>
                    </div>
                ))}

            </div>
        </>
    );
};

export default Warehouse;
