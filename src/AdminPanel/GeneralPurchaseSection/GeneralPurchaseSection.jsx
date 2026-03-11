import { useEffect, useState } from "react";
import "./generalPurchaseSection.css";
import ApiUrl from "../../js/ApiUrl";



const GeneralPurchaseSection =()=> {
    
    /// Блок отображает стоимость закупки номенклатуры всего без учет налогов. За все время существования

    const [summa, setSumma] = useState(0);

    useEffect(()=>{
        // Запрос на сервер для получения суммы закупки
        try {
            const response = fetch(
                `${ApiUrl}/api/ReturnPurchaseComponent`
            );

            if (!response.ok) {
                throw new Error("Ошибка запроса: " + response.status);
            }

            const data =  response.json();

            setSumma(data); 

        } catch (err) {
            console.error("Ошибка запроса данных:", err);
        }
    },[]);

    return  (
        <>
            <div className="general-purchase-section">
                <div className="general-purchase-section__total-card">
                    <div className="gps-total-card__title">Закуплено на сумму:</div>
                    <div className="gps-total-card__number">{summa}</div>
                </div>
            </div>
        </>
    );
    
}

export default GeneralPurchaseSection;