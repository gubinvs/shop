import "./comingResult.css"


const ComingResult = ({ title, list }) => {
    
    // Форматирует строковую дату в читабельный вид
    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("ru-RU");
    };

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
                    <div className="crs-result-table__cell crs-result-table__header">Описание</div>
                </div>
                {list.map((x)=>{
                        return(
                            <>
                                <div className="coming-result-section__result-table_item" id={x.id}>
                                    <div className="crs-result-table__cell crs-result-table__item" id={"crs1" + x.id}>{x.vendorCode}</div>
                                    <div className="crs-result-table__cell crs-result-table__item" id={"crs2" + x.id}>{x.nameComponent}</div>
                                    <div className="crs-result-table__cell crs-result-table__item" id={"crs3" + x.id}>{x.quantity}</div>
                                    <div className="crs-result-table__cell crs-result-table__item" id={"crs5" + x.id}>{new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 }).format(x.price)}</div>
                                    <div className="crs-result-table__cell crs-result-table__item" id={"crs6" + x.id}>{formatDate(x.dateSave)}</div>
                                    <div className="crs-result-table__cell crs-result-table__item" id={"crs6" + x.id}>
                                        {x.noteDiscription}
                                    </div>
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