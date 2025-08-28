import "./availableForOrder.css";
import { useState } from "react";



const AvailableForOrder =({h2Title, cardItem})=> {
        const [items, setItems] = useState([]);
        const [quantities, setQuantities] = useState([]);
        const [cart, setCart] = useState([]);
        const [loading, setLoading] = useState(true);

    const handleIncrement = (index) => {
        const newQuantities = [...quantities];
        newQuantities[index]++;
        setQuantities(newQuantities);
    };

    const handleDecrement = (index) => {
        const newQuantities = [...quantities];
        if (newQuantities[index] > 0) {
            newQuantities[index]--;
            setQuantities(newQuantities);
        }
    };

    const handleAddToCart = (index) => {
        const product = items[index];
        const newCart = [...cart];
        const existingIndex = newCart.findIndex(cartItem => cartItem.vendorСode === product.vendorСode);

        if (quantities[index] > 0) {
            if (existingIndex !== -1) {
                newCart[existingIndex].quantity = quantities[index];
            } else {
                newCart.push({
                    vendorСode: product.vendorСode,
                    nameComponent: product.nameComponent,
                    quantity: quantities[index],
                    price: product.price,
                    basketImgPath: product.basketImgPath,
                    guidId: product.guidId,
                    id: product.id
                });
            }
            setCart(newCart);
        }
    };

    const isInCart = (index) => {
        return cart.some(cartItem => cartItem.vendorСode === items[index].vendorСode);
    };

    return (
        <div className="card-componet-groop-section">
            <div className="container">
                <h2 className="directory-groups__title">{h2Title}</h2>
            </div>
            <div className="container card-componet-groop-section__container">
                {cardItem.map((element, index) => (
                    <div className="card-component" key={element.vendorСode}>
                        <div className="card-component__top">
                            <img src={element.imgLinkIconCard} className="card-component__img" alt="Фото компонента" />
                            <div className="card-component__vendor">{element.vendorСode}</div>
                            <div className="card-component__name" onClick={() => window.location.href = element.linkPage}>{element.nameComponent}</div>
                        </div>
                        <div className="card-component__bottom">
                            <div className="cc-basket-block__delivry-block">
                                <div className={element.quantity === 0 ? "delivry-block__quantity delivry-block__quantity_0" : "delivry-block__quantity"}>
                                    {element.quantity === 0 ? "Под заказ" : `Наличие: ${element.quantity} шт.`}
                                </div>
                            </div>
                            <div className="card-component__price">{new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 }).format(element.price)}</div>
                            <div className="card-component__basket-block">
                                <div className="basket-block__quantity-item">
                                    <div className="quantity-item__minus" onClick={() => handleDecrement(index)}>-</div>
                                    <div className="quantity-item__input">{quantities[index]}</div>
                                    <div className="quantity-item__plus" onClick={() => handleIncrement(index)}>+</div>
                                </div>
                                <button 
                                    className={`basket-block__button ${isInCart(index) ? 'added' : ''} ${quantities[index] === 0 ? 'disabled' : ''}`} 
                                    disabled={quantities[index] === 0} 
                                    onClick={() => handleAddToCart(index)}
                                >
                                    {isInCart(index) ? 'В корзине' : 'В корзину'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );


};

export default AvailableForOrder;