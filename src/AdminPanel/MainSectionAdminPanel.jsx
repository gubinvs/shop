import "./mainSectionAdminPanel.css";
import ApiUrl from "../js/ApiUrl";
import Warehouse from "./Warehouse/Warehouse.jsx";
import Coming from "./Warehouse/Coming.jsx";


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

    const item = [
        {
            id: 1,
            guid: "8847d67a-a9ac-42ac-8c12-44138ac47328",
            vendorCode: "A9F79206",
            nameComponent: "Выключатель автоматический двухполюсный 6А С iC60N 6кА",
            quantity: 1,
            unitOfMeasurement: "шт"
        },
        {
            id: 7,
            guid: "f06bfb25-dae0-4023-9a3b-abeb0e0a0897",
            vendorCode: "TM3AI8",
            nameComponent: "Модуль расширения ТМ3 - 8 аналоговых входов",
            quantity: 1,
            unitOfMeasurement: "шт"
        }
    ];

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
                <br/><br/><br/>
                <Coming itemComponent={item} />
            </div>
        </>
    );

}

export default MainSectionAdminPanel;