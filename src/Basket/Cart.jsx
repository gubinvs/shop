import React, { useState } from 'react';
import "./Cart.css";

const Cart = () => {
  // Данные о товарах в корзине
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'NKU10-VRUS-12110000-01, Панель вводно-распределительная ВРУ1-21-10 УХЛ4 рубильник 1х250А выключатели автоматические 1Р 2х6А плавкие вставки 6х63А 9х100А 3х250А и учет IEK', price: 205600, quantity: 1, image: 'https://encomponent.ru/img/NKU10-VRUS-12110000-01/NKU10-VRUS-12110000-01.avif' }
  ]);

  // Функция для формата в рублевый формат
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 2,
    }).format(price);
  };

  // Функция для удаления товара
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Функция для обновления количества товара
  const updateQuantity = (id, quantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
    ));
  };

  // Функция для расчета общей суммы
  const calculateTotal = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 5.00; // фиксированная доставка
    const tax = subtotal * 0.20; // например, налог 20%
    return { subtotal, shipping, tax, total: subtotal  + shipping + tax };
  };

  const { subtotal, shipping, tax, total } = calculateTotal();

  return (
    <>
      <div className="cart-component-container cart-component-container__main-block">
        <img src="../../images/basket-page-img.jpg" className="cart-main-block__images"  />
        <div className="cart-main-block__slogan-block">
          <div className="cart-main-block__slogan">Товары готовы отправиться к Вам!</div>
        </div>
      </div>
      <div className="cart-component-container">
        <h1>Комплектация заказа:</h1>
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <p><strong>{item.name}</strong></p>
                <p>{formatPrice(item.price)}</p>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => removeItem(item.id)}>Удалить</button>
                <input 
                  type="number" 
                  value={item.quantity} 
                  min="1"
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="summary">
          {/* <h2>Стоимость заказа</h2> */}
          <div className="total" style={{ fontWeight: 'bold' }}>
            <span>Общая стоимость заказа</span><span>{formatPrice(subtotal)}</span>
          </div>
          {/* <div className="total">
            <span>Стандартная доставка</span><span>{formatPrice(shipping)}</span>
          </div> */}
          <div className="total">
            <span>В том числе, НДС 20%</span><span>{formatPrice(tax)}</span>
          </div>
          {/* <div className="total" style={{ fontWeight: 'bold' }}>
            <span>Стоимость заказа</span><span>{formatPrice(total)}</span>
          </div> */}
          <button className="checkout-button">Оформить заказ</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
