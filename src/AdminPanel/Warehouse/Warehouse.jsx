import "./warehouse.css";
import { useState, useEffect } from "react";
import ApiUrl from "../../js/ApiUrl.js";



const Warehouse = ({itemComponent}) => {
    
    
    // Всего налогов коэффициент НДС 22% + НДФЛ 15%
    const totalTaxes = 1.37; 

    // Наценка Интернет-магазина коэффициент
    const markupShopEncomponent = 1.5;

    // Наценка Озон коэффициент
    const markupOzon = 1.6;

     const [docList, setDocList] = useState([]);
    // Форматирует строковую дату в читабельный вид

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




    return (
        <>
            <div className="warehouse-main-section__container">
                <h2 className="warehouse-main-section__title">Наличие товара на складе:</h2>
                <div className="warehouse-main-section__result-table_header">
                    <div className="wms-result-table__cell wms-result-table__header">Артикул</div>
                    <div className="wms-result-table__cell wms-result-table__header">Наименование</div>
                    <div className="wms-result-table__cell wms-result-table__header">Наличие, шт</div>
                    <div className="wms-result-table__cell wms-result-table__header">Cред. цена покупки, без налогов</div>
                    <div className="wms-result-table__cell wms-result-table__header">Cред. цена продажи, без налогов</div>
                    <div className="wms-result-table__cell wms-result-table__header">Рекоменд. цена продажи, на сайте</div>
                    <div className="wms-result-table__cell wms-result-table__header">Рекоменд. цена продажи, в Озон</div>
                </div>
                {docList.map((x)=>{
                        return(
                            <>
                                <div className="warehouse-main-section__result-table_item" id={x.id}>
                                    <div className="wms-result-table__cell wms-result-table__item" id={"wms1" + x.id}>{x.vendorCode}</div>
                                    <div className="wms-result-table__cell wms-result-table__item" d={"wms2" + x.id}>{x.nameComponent}</div>
                                    <div className="wms-result-table__cell wms-result-table__item" d={"wms3" + x.id}>{x.quantity}</div>
                                    <div className="wms-result-table__cell wms-result-table__item" d={"wms5" + x.id}>{new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 }).format(x.averagePurchasePrice)}</div>
                                    <div className="wms-result-table__cell wms-result-table__item" d={"wms5" + x.id}>{new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 }).format(x.averageSellingPrice)}</div>
                                    <div className="wms-result-table__cell wms-result-table__item" d={"wms5" + x.id}>
                                        {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 }).format(x.averagePurchasePrice * markupShopEncomponent * totalTaxes)}
                                        <img src="../images/update__icon2.png" alt="@" className="wms-result-table__item_icon" />
                                    </div>
                                    <div className="wms-result-table__cell wms-result-table__item" d={"wms5" + x.id}>
                                        {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 }).format(x.averagePurchasePrice * markupShopEncomponent * totalTaxes * markupOzon)}
                                        <img src="../images/update__icon2.png" alt="@" className="wms-result-table__item_icon" />
                                    </div>
                                </div>
                            </>
                        );
                    })
                }   
            </div>
            
        </>
    );
}

export default Warehouse;