import "./mainSectionAdminPanel.css";
import "./Warehouse/warehouse.css";
import AdminMailer from "./AdminMailer/AdminMailer";
import UpdateQuantityKeaz from "./UpdateQuantityKeaz/UpdateQuantityKeaz.jsx";



const MainSectionAdminPanel = () => {

    return (
        <>
            <div className="main-section-admin-panel">            
                <div className="admin-mailer__container">
                    <AdminMailer title={"Рассылка от gmail.com:"} urlRegust={"http://31.129.97.48:1100/api/Upload/upload-excel"}/>
                    <br/><br/>
                    <AdminMailer title={"Рассылка от mail.ru:"} urlRegust={"http://31.129.97.48:1110/api/Upload/upload-excel"}/>
                    <br/><br/>
                    <UpdateQuantityKeaz />
                    <br/><br/><br/>
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
                
                
                    <div
                        className="warehouse-main-section__result-table_item warehouse-main-section__result-table_item_economics"
                        key={1}
                    >
                        <div className="wms-result-table__cell wms-result-table__item"></div>
                        <div className="wms-result-table__cell wms-result-table__item"></div>
                        <div className="wms-result-table__cell wms-result-table__item"></div>
                        <div className="wms-result-table__cell wms-result-table__item">
                            {new Intl.NumberFormat("ru-RU", {
                                style: "currency",
                                currency: "RUB",
                                minimumFractionDigits: 0
                            }).format()}
                        </div>
                        <div className="wms-result-table__cell wms-result-table__item"></div>
                        <div className="wms-result-table__cell wms-result-table__item">
                            {new Intl.NumberFormat("ru-RU", {
                                style: "currency",
                                currency: "RUB",
                                minimumFractionDigits: 0
                            }).format()}
                            
                        </div>
                        <div className="wms-result-table__cell wms-result-table__item">
                            {new Intl.NumberFormat("ru-RU", {
                                style: "currency",
                                currency: "RUB",
                                minimumFractionDigits: 0
                            }).format()}
                        </div>
                    </div>
                

            </div>
                </div>
            </div>
        </>
    );

}

export default MainSectionAdminPanel;