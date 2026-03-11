import { useEffect, useState } from "react";
import "./generalPurchaseSection.css";
import ApiUrl from "../../js/ApiUrl";



const GeneralPurchaseSection =(
    {title}
)=> {
    
    /// Блок отображает стоимость закупки номенклатуры всего без учет налогов. За все время существования

    const [summa, setSumma] = useState(100000);

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
            <div className="general-purchase-section__total-card">
                <div className="gps-total-card__title">{title}</div>
                <div className="gps-total-card__number">
                    {new Intl.NumberFormat("ru-RU", {
                        style: "currency",
                        currency: "RUB",
                        minimumFractionDigits: 0,
                    }).format(summa)}
                </div>
            </div>
        </>
    );
    
}

export default GeneralPurchaseSection;