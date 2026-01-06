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
                <MainSectionAdminPanel />
            </div>
        </>
    );

};

export default AdminPanel;