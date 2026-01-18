import { useState, useEffect } from "react";
import ApiUrl from "../js/ApiUrl.js";
import "./adminPanel.css";
import "./mainSectionAdminPanel.css";
import NavigationBar from "../AdminPanel/NavigationBar/NavigationBar.jsx";
import Coming from "./Coming/Coming.jsx";
import ComingResult from "./Coming/ComingResult.jsx";
import { clearComingComponent } from "../js/clearComingComponent.js";

/// Страница данных о реализации товаров со склада
const ConsumptionPage =({nomenclature})=> {

    const [docList, setDocList] = useState([]);
    // Форматирует строковую дату в читабельный вид

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch(
                    `${ApiUrl}/api/ReturnConsumptionComponent/MySuperToken123`
                );

                if (!response.ok) {
                    throw new Error("Ошибка запроса: " + response.status);
                }

                const data = await response.json();

                const formattedData = data.map(item => ({
                    id: item.id,
                    guid: item.guidIdComponent,
                    vendorCode: item.vendorCode,
                    nameComponent: item.nameComponent,
                    quantity: item.quantityGoods,
                    price: item.itemPrice,
                    noteDiscription: item.noteDiscription,
                    dateSave: item.dataRecord
                }))
                .reverse();

                setDocList(formattedData);

            } catch (err) {
                console.error("Ошибка загрузки номенклатуры:", err);
            }
        };

        loadData();
    }, []);

    return (
        <>
           <div className="admin-panel__container">
                <NavigationBar />
                <div className="main-section-admin-panel">
                    <Coming itemComponent={nomenclature} title={"Реализация товара"} addDataFunction={clearComingComponent} />
                    <br/><br/><br/>
                    <ComingResult title={"Перечень операций реализации:"} list={docList}/>
                </div>
            </div>
        </>
    );
};

export default ConsumptionPage;