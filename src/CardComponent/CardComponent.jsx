import "./cardComponent.css";
import React from "react";


// Карточка товара
const CardComponent = ({urlImg, price, dicription}) => {
    return(
        <>
            <div className="card-goods">
                <img src={urlImg} className="card-goods__img" alt="@" />
                <div className="card-goods__price">
                    {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 }).format(price)}
                </div>
                <div className="card-goods__discription">
                    {dicription}
                </div>
            </div>
        </>
    )
    
};


export default CardComponent;