import "../index.css";
import "./adminPanel.css";
import NavigationBar from "../AdminPanel/NavigationBar/NavigationBar.jsx";
import MainSectionAdminPanel from "./MainSectionAdminPanel.jsx";

/// Панель администратора:
/// Добавление в базу данных новых товаров

const AdminPanel =()=> {

    return(
        <>
            <div className="admin-panel__container">
                <NavigationBar />
                <div className="admin-panel__main-block">
                    <>
                        <MainSectionAdminPanel />
                    </>  
                </div>
            </div>
        </>
    );

};

export default AdminPanel;