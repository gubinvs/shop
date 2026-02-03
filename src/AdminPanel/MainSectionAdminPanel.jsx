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
                </div>
            </div>
        </>
    );

}

export default MainSectionAdminPanel;