import React, { useState, useEffect } from 'react';
import "./Cart.css";
import addOrder from './AddOrder.js';

const Cart = (props) => {
  const [cartItems, setCartItems] = useState([]);

  //  функия удаляет дубли по id
  const uniqueItems = Array.from(new Map(cartItems.map(item => [item.id, item])).values());

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

  
  const [userInfo, setUserInfo] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



    // Используем useEffect, чтобы обновить корзину при получении props.item
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          if (props.item) {
            setCartItems(props.item);  // Обновляем состояние с новым товаром из props
          } else {
    }
        } catch (err) {
          setError("Не удалось загрузить данные");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [props.item]);
  
    if (loading) {
      return (
        <div className="loading-wrapper">
          <div className="spinner"></div>
          <p>Загрузка данных...</p>
        </div>
      );
    }
  
    if (error) return <div>Ошибка: {error}</div>;
  /// ! Завершение блока имитации загрузки 
  // console.log(cartItems);

  return (
    <>
      <div className="cart-component-container cart-component-container__main-block">
        <img src="../../images/basket-page-img.jpg" className="cart-main-block__images" />
        <div className="cart-main-block__slogan-block">
          <div className="cart-main-block__slogan">Товары готовы отправиться к Вам!</div>
        </div>
      </div>
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
          <div className="total" style={{ fontWeight: 'bold' }}>
            <span>Общая стоимость заказа</span><span>{formatPrice(subtotal)}</span>
          </div>
          <div className="total">
            <span>В том числе, НДС 20%</span><span>{formatPrice(tax)}</span>
          </div>
          <button className="checkout-button" onClick={() => addOrder(cartItems)}>Оформить заказ</button>
        </div>
      </div>
    </>
  );
};

export default Cart;