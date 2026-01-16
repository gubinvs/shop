import "./adminPanel.css";
import "./mainSectionAdminPanel.css";
import NavigationBar from "../AdminPanel/NavigationBar/NavigationBar.jsx";
import Coming from "./Coming/Coming.jsx";
import ComingResult from "./Coming/ComingResult.jsx";
import {item} from "./item.js";
import  { addComingComponent } from "../js/addComingComponent.js";

/// Страница данных о приходовании товаров на склад
const ComingPage =()=> {
    return (
        <>
           <div className="admin-panel__container">
                <NavigationBar />
                <div className="main-section-admin-panel">
                    <Coming itemComponent={item} title={"Оприходование товара"} addDataFunction={addComingComponent}/>
                    <br/><br/><br/>
                    <ComingResult title={"Перечень операций оприходования:"}/>
                </div>
            </div>
        </>
    );
};

export default ComingPage;