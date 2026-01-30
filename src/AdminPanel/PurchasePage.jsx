import { useEffect, useState } from "react";
import "./adminPanel.css";
import "./mainSectionAdminPanel.css";
import ApiUrl from "../js/ApiUrl";
import { clearComingComponent } from "../js/clearComingComponent";
import NavigationBar from "./NavigationBar/NavigationBar";
import Coming from "./Coming/Coming";
import ComingResult from "./Coming/ComingResult";




// Данные о закупленных товарах, которые в пути
const PurchasePage =({nomenclature})=> {

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
                    <Coming itemComponent={nomenclature} title={"Закуп товара"} addDataFunction={clearComingComponent} />
                    <br/><br/><br/>
                    <ComingResult title={"Перечень закупленного товара"} list={docList}/>
                </div>
            </div>
        </>
    );

};

export default PurchasePage;
