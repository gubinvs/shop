import "./mainSectionAdminPanel.css";
import "./Warehouse/warehouse.css";
import AdminMailer from "./AdminMailer/AdminMailer";
import UpdateQuantityKeaz from "./UpdateQuantityKeaz/UpdateQuantityKeaz.jsx";
import GeneralPurchaseSection from "./GeneralPurchaseSection/GeneralPurchaseSection.jsx";



const MainSectionAdminPanel = () => {

    return (
        <>
            <div className="main-section-admin-panel">            
                <div className="admin-mailer__container">
                    <div className="general-purchase-section">
                        <GeneralPurchaseSection title="Закуплено на сумму:" controllerName="TotalPurchaseAmount" />
                        <GeneralPurchaseSection title="Продано на сумму:" controllerName="TotalSales" />
                        <GeneralPurchaseSection title="Сумма в товаре:" controllerName="ReturnCostPriceOfGoods" />
                    </div>
                    <br/><br/>
                    <AdminMailer title={"Рассылка от gmail.com:"} urlRegust={"http://31.129.97.48:1100/api/Upload/upload-excel"}/>
                    <br/><br/>
                    <AdminMailer title={"Рассылка от mail.ru:"} urlRegust={"http://31.129.97.48:1110/api/Upload/upload-excel"}/>
                    <br/><br/>
                    <UpdateQuantityKeaz />
                </div>
            </div>
        </>
    );

}

export default MainSectionAdminPanel;