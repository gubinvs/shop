import React, { useState, useEffect } from 'react';
import "./Cart.css";
import addOrder from './AddOrder.js';
import { formatPrice } from "../js/formatPrice.js";

const Cart = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // новое состояние
  const [error, setError] = useState(null);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
    ));
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 5.00;
    const tax = subtotal * 0.20;
    return { subtotal, shipping, tax, total: subtotal + shipping + tax };
  };

  const { subtotal, tax } = calculateTotal();

  useEffect(() => {
    if (props.item) setCartItems(props.item);
  }, [props.item]);

  const handleOrder = async () => {
    setIsSubmitting(true);
    try {
      await addOrder(cartItems);
    } catch (err) {
      setError("Не удалось оформить заказ.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="cart-component-container">
        <h1>Комплектация заказа:</h1>
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-images-container">
                <img src={item.image} alt={item.name} className="cart-images" />
              </div>
              <div className="cart-item-details">
                <p><strong>{item.vendorCode}</strong></p>
                <p><strong>{item.name}</strong></p>
                <p>{formatPrice(item.price)}</p>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => removeItem(item.id)} disabled={isSubmitting}>Удалить</button>
                <input 
                  type="number" 
                  value={item.quantity} 
                  min="1"
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="summary">
            <div className="total" style={{ fontWeight: 'bold' }}>
              <span>Общая стоимость заказа</span><span>{formatPrice(subtotal)}</span>
            </div>
            <div className="total">
              <span>В том числе, НДС 20%</span><span>{formatPrice(tax)}</span>
            </div>
            <button 
              className="checkout-button" 
              onClick={handleOrder} 
              disabled={isSubmitting || cartItems.length === 0}
            >
              {isSubmitting ? "Оформление заказа..." : "Оформить заказ"}
            </button>
            {isSubmitting && (
              <p style={{ marginTop: "10px", color: "#555" }}>Идет оформление заказа, подождите...</p>
            )}
            {error && <p className="error">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Cart;
