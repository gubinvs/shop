import "./adminPanel.css";
import "./mainSectionAdminPanel.css";
import "./Warehouse/warehouse.css";
import AdminMailer from "./AdminMailer/AdminMailer";
import UpdateQuantityKeaz from "./UpdateQuantityKeaz/UpdateQuantityKeaz.jsx";
import GeneralPurchaseSection from "./GeneralPurchaseSection/GeneralPurchaseSection.jsx";



const MainSectionAdminPanel = () => {

    return (
        <>
            {/* <div className="main-section-admin-panel">            
                <div className="admin-mailer__container">
                    <div className="general-purchase-section">
                        <GeneralPurchaseSection title="Закуплено на сумму:" controllerName="TotalPurchaseAmount" />
                        <GeneralPurchaseSection title="Продано на сумму:" controllerName="TotalSales" />
                        <GeneralPurchaseSection title="Сумма в товаре:" controllerName="ReturnCostPriceOfGoods" />
                        <GeneralPurchaseSection title="Продается на сумму:" controllerName="TotalSellingPrice" />
                    </div>
                </div>
            </div> */}
            <div className="main-section-admin-panel__button-block">
                <div 
                    className="add-data-button add-data-button__new-component"
                    onClick={()=>{window.location.href="/AddComponentData"}}
                >
                    Добавить новый товар
                </div>
                <div 
                    className="add-data-button"
                >
                    Обновить наличие на складах ОЗОН
                </div>
            </div>
    
        </>
    );
}

export default MainSectionAdminPanel;