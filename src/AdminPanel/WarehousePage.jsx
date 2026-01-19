import "./adminPanel.css";
import "./mainSectionAdminPanel.css";
import NavigationBar from "../AdminPanel/NavigationBar/NavigationBar.jsx";
import Warehouse from "./Warehouse/Warehouse.jsx";
import {item} from "../js/allItemComponents.js";


/// Страница данных о реализации товаров со склада
const WarehousePage =()=> {

    return (
        <>
           <div className="admin-panel__container">
                <NavigationBar />
                <div className="main-section-admin-panel">
                    <Warehouse itemComponent={item} />
                </div>
            </div>
        </>
    );
};

export default WarehousePage;