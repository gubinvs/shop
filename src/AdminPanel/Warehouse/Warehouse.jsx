import "./warehouse.css";



const Warehouse = ({itemComponent}) => {

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
                {itemComponent.map((x)=>{
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