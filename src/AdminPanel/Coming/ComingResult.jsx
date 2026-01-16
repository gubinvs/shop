import "./comingResult.css"


const ComingResult = ({title}) => {

    
    const docList = [
        {
            id: 1,
            guid: "8847d67a-a9ac-42ac-8c12-44138ac47328",
            vendorCode: "A9F79206",
            nameComponent: "Выключатель автоматический двухполюсный 6А С iC60N 6кА",
            quantity: 1,
            price: 24000,
            dateSave: "2026-01-04"
        },
        {
            id: 7,
            guid: "f06bfb25-dae0-4023-9a3b-abeb0e0a0897",
            vendorCode: "TM3AI8",
            nameComponent: "Модуль расширения ТМ3 - 8 аналоговых входов",
            quantity: 1,
            price: 24000,
            dateSave: "2026-01-04"
        },
        {
            id: 18,
            guid: "e8f67326-cc8a-4b23-b7b0-e5d9d56d6681",
            vendorCode: "LC1D18M7",
            nameComponent: "Cиловой электромеханический контактор серии TeSys D",
            quantity: 1,
            price: 24000,
            dateSave: "2026-01-04"
        },
        {
            id: 28,
            guid: "61b3c0ba-4a87-4e16-a173-960721965f15",
            vendorCode: "TM241CE24T",
            nameComponent: "Контроллер M241-24IO транзисторный источник ETHERNET",
            quantity: 1,
            price: 24000,
            dateSave: "2026-01-04"
        }
    ];

    return(
        <>
            <div className="coming-result-section__container">
                <h2 className="coming-result-section__title">{title}</h2>
                <div className="coming-result-section__result-table_header">
                    <div className="crs-result-table__cell crs-result-table__header">Артикул</div>
                    <div className="crs-result-table__cell crs-result-table__header">Наименование</div>
                    <div className="crs-result-table__cell crs-result-table__header">Кол-во</div>
                    <div className="crs-result-table__cell crs-result-table__header">$, без налогов</div>
                    <div className="crs-result-table__cell crs-result-table__header">Дата оформл.</div>
                </div>
                {docList.map((x)=>{
                        return(
                            <>
                                <div className="coming-result-section__result-table_item" id={x.id}>
                                    <div className="crs-result-table__cell crs-result-table__item" id={"crs1" + x.id}>{x.vendorCode}</div>
                                    <div className="crs-result-table__cell crs-result-table__item" d={"crs2" + x.id}>{x.nameComponent}</div>
                                    <div className="crs-result-table__cell crs-result-table__item" d={"crs3" + x.id}>{x.quantity}</div>
                                    <div className="crs-result-table__cell crs-result-table__item" d={"crs5" + x.id}>{new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 }).format(x.price)}</div>
                                    <div className="crs-result-table__cell crs-result-table__item" d={"crs6" + x.id}>{x.dateSave}</div>
                                </div>
                            </>          
                        );
                    })
                } 
            </div>
        </>
    );

};  


export default ComingResult;