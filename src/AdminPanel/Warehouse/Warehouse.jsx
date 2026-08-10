import "./warehouse.css";
import { useState, useEffect, useMemo } from "react";
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

    // 1. Задаем желаемый порядок приоритетных артикулов
    const priorityOrder = [
        "LC1D09M7", 
        "LC1D12M7", 
        "LC1D18M7", 
        "LC1D25M7", 
        "LC1D32M7", 
        "LC1D09M7С",
        "LC1D32M7C",
        "TM241CE24T",
        "TM241CE40T",
        "TM3AI8",
        "TM3DI8",
        "TM3DI16",
        "TM3DQ8T",
        "TM3DQ16T",
        "2866763",
        "2903148",
        "3044102",
        "3044115",
        "3044128"
    ];

    // Превращаем в Map для моментального поиска: {'C40F31M320' => 0, 'C40F32D250' => 1, ...}
    const priorityMap = new Map(priorityOrder.map((code, index) => [code, index]));

    // 2. Создаем отсортированную копию массива
    const sortedList = useMemo(() => {
        return [...currentList].sort((a, b) => {
            // Получаем индекс из Map (если элемента нет, вернет undefined)
            const indexA = priorityMap.get(a.vendorCode);
            const indexB = priorityMap.get(b.vendorCode);

            const hasA = indexA !== undefined;
            const hasB = indexB !== undefined;

            // Оба в приоритете -> сравниваем их порядковые номера
            if (hasA && hasB) return indexA - indexB;
            
            // Только один в приоритете -> поднимаем его наверх
            if (hasA) return -1;
            if (hasB) return 1;

            // Остальные 100+ товаров сортируем по алфавиту
            return a.vendorCode.localeCompare(b.vendorCode);
        });
    }, [currentList]); // Пересчитывается только если изменился исходный список);


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

                {/*{currentList.map(x => (*/}
                {sortedList.map(x => (
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
