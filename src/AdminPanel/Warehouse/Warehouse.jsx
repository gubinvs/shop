import "./warehouse.css";



const Warehouse = () => {

    const item = [
        {
            id: 1,
            guid: "8847d67a-a9ac-42ac-8c12-44138ac47328",
            vendorCode: "A9F79206",
            nameComponent: "Выключатель автоматический двухполюсный 6А С iC60N 6кА",
            quantity: 1,
            unitOfMeasurement: "шт"
        },
        {
            id: 7,
            guid: "f06bfb25-dae0-4023-9a3b-abeb0e0a0897",
            vendorCode: "TM3AI8",
            nameComponent: "Модуль расширения ТМ3 - 8 аналоговых входов",
            quantity: 1,
            unitOfMeasurement: "шт"
        }
    ];

    return (
        <>
            <div className="warehouse-main-section__container">
                <h2 className="warehouse-main-section__title">Наличие товара на складе:</h2>
                <div className="warehouse-main-section__result-table_header">
                    <div className="wms-result-table__cell wms-result-table__header">Артикул</div>
                    <div className="wms-result-table__cell wms-result-table__header">Наименование</div>
                    <div className="wms-result-table__cell wms-result-table__header">Кол-во</div>
                    <div className="wms-result-table__cell wms-result-table__header">Ед.</div>
                </div>
                {item.map((x)=>{
                        return(
                            <>
                                <div className="warehouse-main-section__result-table_item" id={x.id}>
                                    <div className="wms-result-table__cell wms-result-table__item" id={"a" + x.id}>{x.vendorCode}</div>
                                    <div className="wms-result-table__cell wms-result-table__item" d={"a" + x.id}>{x.nameComponent}</div>
                                    <div className="wms-result-table__cell wms-result-table__item" d={"a" + x.id}>{x.quantity}</div>
                                    <div className="wms-result-table__cell wms-result-table__item" d={"a" + x.id}>{x.unitOfMeasurement}</div>
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