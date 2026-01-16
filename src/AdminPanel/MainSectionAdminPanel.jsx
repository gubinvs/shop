import "./mainSectionAdminPanel.css";
import ApiUrl from "../js/ApiUrl";
import Warehouse from "./Warehouse/Warehouse.jsx";
import Coming from "./Coming/Coming.jsx";
import ComingResult from "./Coming/ComingResult.jsx";
import {item} from "./item.js";


const MainSectionAdminPanel = () => {

    const token = "MySuperToken123";

    const updateKeazQuantityItem = () => {
        fetch(`${ApiUrl}/api/keaz/run?token=${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        })
        .then(data => {
            console.log(data.massage);
        });
    }


    return (
        <>
            <div className="main-section-admin-panel">
                <h4 className="main-section-admin-panel__title">Обновление данных о цене и количестве на складах KEAZ:</h4>
                <button
                    className="button-update"
                    onClick={()=>{updateKeazQuantityItem()}
                }>Обновить данные</button>
                <br/><br/>
                <Warehouse itemComponent={item} />
                
                <Coming itemComponent={item} title={"Реализация товара"} />
                <br/><br/><br/>
                <ComingResult itemComponent={item} title={"Перечень операций реализации:"}/>
            </div>
        </>
    );

}

export default MainSectionAdminPanel;