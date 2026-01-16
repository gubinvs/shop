import "./adminPanel.css";
import "./mainSectionAdminPanel.css";
import NavigationBar from "../AdminPanel/NavigationBar/NavigationBar.jsx";
import Coming from "./Coming/Coming.jsx";
import ComingResult from "./Coming/ComingResult.jsx";
import {item} from "./item.js";


const ConsumptionPage =()=> {
    return (
        <>
           <div className="admin-panel__container">
                <NavigationBar />
                <div className="main-section-admin-panel">
                    <Coming itemComponent={item} title={"Реализация товара"} />
                    <br/><br/><br/>
                    <ComingResult itemComponent={item} title={"Перечень операций реализации:"}/>
                </div>
            </div>
        </>
    );
};

export default ConsumptionPage;