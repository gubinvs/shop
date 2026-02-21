import "./warehouse.css";
import { useState, useEffect } from "react";
import ApiUrl from "../../js/ApiUrl.js";
import { priceUpdateWebsite } from "../../js/priceUpdateWebsite.js";

const Warehouse = () => {

    // С — себестоимость товара
    // P — цена продажи
    // Налог = 37% с дохода
    // Чистая прибыль = 30% от себестоимости (важно: именно от себестоимости, а не от выручки — если я понял правильно)
    // После уплаты налогов оставется 0,63 выручки
    // P × 0,63 = C + 0,3C
    // P × 0,63 = 1,3C
    // P = 1,3C / 0,63 ≈ 2,063C - Цена продажи

    // Налоговая нагрузка
    // Налоги 15% на прибыль и 22% НДС, с таким учетом, что после вычета их осталась маржа в 30%
    const totalTaxes = 2.063;

    // Процент ОЗОН
    const markupOzon = 1.6;

    // Список номенклатуры
    const [docList, setDocList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState(0);
    const [formPrice, setFormPrice] = useState([]);

   useEffect(() => {
        const initialState = {};
        docList.forEach(item => {
            initialState[item.id] = false;
        });
        setFormPrice(initialState);
    }, [docList]);

    // Строк в таблице выдачи результата
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
                    averagePurchasePrice: item.averagePurchasePrice, // cредняя цена закупки
                    averageSellingPrice: item.averageSellingPrice // средняя цена продажи
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
                            }).format(Math.round(x.averagePurchasePrice * totalTaxes))}
                        </div>
                        <div className="wms-result-table__cell wms-result-table__item">
                             <img
                                src="../images/changes.png"
                                alt="@"
                                className="wms-result-table__item_icon"
                                onClick={() => {
                                        setFormPrice(prev => {
                                            const newState = {};
                                            Object.keys(prev).forEach(key => {
                                                newState[key] = false; // всем false
                                            });
                                            newState[x.id] = true; // только текущему true
                                            return newState;
                                        });
                                    }}
                            />
                            <div
                                className={formPrice[x.id]
                                    ? "wms-result-table__item_form-price"
                                    : "wms-result-table__item_form-price_none"}
                            >
                                <div className="wrt-item-form-price__title">Установить цену для {x.vendorCode}:</div>
                                <input 
                                    type="number" 
                                    className="wrt-item-form-price__price" 
                                    min={0} 
                                    onChange={(e) => {
                                        setPrice(e.target.value); 
                                    }}
                                    />
                                <button 
                                    className="wrt-item-form-price__button"
                                    onClick={() =>{
                                        priceUpdateWebsite(
                                            x.guid,
                                            price
                                        )
                                        setFormPrice(prev => ({
                                            ...prev,
                                            [x.id]: false
                                        }));
                                    }}
                                >
                                    Записать
                                </button>
                            </div>
                        </div>
                        <div className="wms-result-table__cell wms-result-table__item">
                            {new Intl.NumberFormat("ru-RU", {
                                style: "currency",
                                currency: "RUB",
                                minimumFractionDigits: 0
                            }).format(Math.round(
                                x.averagePurchasePrice *
                                    totalTaxes *
                                    markupOzon)
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
        </>
    );
};

export default Warehouse;
