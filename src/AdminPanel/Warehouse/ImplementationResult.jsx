import "./implementationResult.css";




const ImplementationResult = () => {

    const docList = [
        {
            id: 1,
            guid: "8847d67a-a9ac-42ac-8c12-44138ac47328",
            vendorCode: "A9F79206",
            nameComponent: "Выключатель автоматический двухполюсный 6А С iC60N 6кА",
            quantity: 1,
            unitOfMeasurement: "шт",
            price: 24000,
            dateSave: "2026-01-04"
        },
        {
            id: 7,
            guid: "f06bfb25-dae0-4023-9a3b-abeb0e0a0897",
            vendorCode: "TM3AI8",
            nameComponent: "Модуль расширения ТМ3 - 8 аналоговых входов",
            quantity: 1,
            unitOfMeasurement: "шт",
            price: 24000,
            dateSave: "2026-01-04"
        },
        {
            id: 18,
            guid: "e8f67326-cc8a-4b23-b7b0-e5d9d56d6681",
            vendorCode: "LC1D18M7",
            nameComponent: "Cиловой электромеханический контактор серии TeSys D",
            quantity: 1,
            unitOfMeasurement: "шт",
            price: 24000,
            dateSave: "2026-01-04"
        },
        {
            id: 28,
            guid: "61b3c0ba-4a87-4e16-a173-960721965f15",
            vendorCode: "TM241CE24T",
            nameComponent: "Контроллер M241-24IO транзисторный источник ETHERNET",
            quantity: 1,
            unitOfMeasurement: "шт",
            price: 24000,
            dateSave: "2026-01-04"
        }
    ];

    return (
        <>
            <div className="implementation-result-section">
                <h2 className="implementation-result-section__title">Перечень операций реализации:</h2>
                <div className="implementation-result-section__result-table_header">
                    <div className="i-result-table__cell i-result-table__header">Артикул</div>
                    <div className="i-result-table__cell i-result-table__header">Наименование</div>
                    <div className="i-result-table__cell i-result-table__header">Кол-во</div>
                    <div className="i-result-table__cell i-result-table__header">Ед.</div>
                    <div className="i-result-table__cell i-result-table__header">$, без налогов</div>
                    <div className="i-result-table__cell i-result-table__header">Дата оформл.</div>
                </div>
                {docList.map((x)=>{
                        return(
                            <>
                                <div className="coming-result-section__result-table_item" id={x.id}>
                                    <div className="i-result-table__cell i-result-table__item" id={"i1" + x.id}>{x.vendorCode}</div>
                                    <div className="i-result-table__cell i-result-table__item" d={"i2" + x.id}>{x.nameComponent}</div>
                                    <div className="i-result-table__cell i-result-table__item" d={"i3" + x.id}>{x.quantity}</div>
                                    <div className="i-result-table__cell i-result-table__item" d={"i4" + x.id}>{x.unitOfMeasurement}</div>
                                    <div className="i-result-table__cell i-result-table__item" d={"i5" + x.id}>{x.price}</div>
                                    <div className="i-result-table__cell i-result-table__item" d={"i6" + x.id}>{x.dateSave}</div>
                                </div>
                            </>          
                        );
                    })
                } 
            </div>
        </>
    );

};


export default ImplementationResult;