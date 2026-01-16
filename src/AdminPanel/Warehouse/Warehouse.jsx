import "./warehouse.css";



const Warehouse = ({itemComponent}) => {

     
    // Всего налогов коэффициент НДС 22% + НДФЛ 15%
    const totalTaxes = 1.37; 

    // Наценка Интернет-магазина коэффициент
    const markupShopEncomponent = 2;

    // Наценка Озон коэффициент
    const markupOzon = 1.6;



    return (
        <>
            <div className="warehouse-main-section__container">
                <h2 className="warehouse-main-section__title">Наличие товара на складе:</h2>
                <div className="warehouse-main-section__result-table_header">
                    <div className="wms-result-table__cell wms-result-table__header">Артикул</div>
                    <div className="wms-result-table__cell wms-result-table__header">Наименование</div>
                    <div className="wms-result-table__cell wms-result-table__header">Кол-во</div>
                    <div className="wms-result-table__cell wms-result-table__header">Ед.</div>
                    <div className="wms-result-table__cell wms-result-table__header">Cред. цена покупки, без налогов</div>
                    <div className="wms-result-table__cell wms-result-table__header">Cред. цена продажи, без налогов</div>
                    <div className="wms-result-table__cell wms-result-table__header">Фин. результат</div>
                    <div className="wms-result-table__cell wms-result-table__header">Рекоменд. цена продажи, на сайте</div>
                    <div className="wms-result-table__cell wms-result-table__header">Рекоменд. цена продажи, в Озон</div>
                </div>
                {itemComponent.map((x)=>{
                        return(
                            <>
                                <div className="warehouse-main-section__result-table_item" id={x.id}>
                                    <div className="wms-result-table__cell wms-result-table__item" id={"wms1" + x.id}>{x.vendorCode}</div>
                                    <div className="wms-result-table__cell wms-result-table__item" d={"wms2" + x.id}>{x.nameComponent}</div>
                                    <div className="wms-result-table__cell wms-result-table__item" d={"wms3" + x.id}>{x.quantity}</div>
                                    <div className="wms-result-table__cell wms-result-table__item" d={"wms4" + x.id}>{x.unitOfMeasurement}</div>
                                    <div className="wms-result-table__cell wms-result-table__item" d={"wms5" + x.id}>{new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 }).format(x.averagePurchasePrice)}</div>
                                    <div className="wms-result-table__cell wms-result-table__item" d={"wms5" + x.id}>{new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 }).format(x.averageSellingPrice)}</div>
                                    <div className="wms-result-table__cell wms-result-table__item" d={"wms5" + x.id}>{new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 }).format(x.averageSellingPrice - x.averagePurchasePrice)}</div>
                                    <div className="wms-result-table__cell wms-result-table__item" d={"wms5" + x.id}>{new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 }).format(x.averagePurchasePrice * markupShopEncomponent * totalTaxes)}</div>
                                    <div className="wms-result-table__cell wms-result-table__item" d={"wms5" + x.id}>{new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 }).format(x.averagePurchasePrice * markupShopEncomponent * totalTaxes * markupOzon)}</div>
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