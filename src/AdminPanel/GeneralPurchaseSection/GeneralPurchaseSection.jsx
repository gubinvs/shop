import { useEffect, useState } from "react";
import "./generalPurchaseSection.css";
import {totalPriceRequest} from "../../js/totalPriceRequest.js";

/// Блок отображает стоимость закупки номенклатуры всего без учет налогов. За все время существования


const GeneralPurchaseSection = ({ title, controllerName }) => {
    const [summa, setSumma] = useState(0);

    useEffect(() => {
        const load = async () => {
            const value = await totalPriceRequest(controllerName);
            setSumma(value);
        };
        load();
    }, [controllerName]);

    return (
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
    );
};

export default GeneralPurchaseSection;