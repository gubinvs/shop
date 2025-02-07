import React from 'react';
import { useState } from "react";
import ApiUrl from '../js/ApiUrl.js';
import { data } from "react-router-dom";
import './DeliveryAndPayment.css';
import HeaderGuest from '../Header/HeaderGuest.jsx';

const DeliveryAndPayment = () => {
  return (
    <>
      <HeaderGuest />
      <div className="delivery-payment-container">
        <h1>Доставка и оплата</h1>

        <section className="delivery-section">
          <h2>Доставка</h2>
          <div className="delivery-option">
            <h3>Деловые Линии</h3>
            <p>Доставка осуществляется транспортной компанией «Деловые Линии». Сроки и стоимость рассчитываются в зависимости от региона доставки. Вы можете отслеживать статус отправления на сайте компании.</p>
            <a href="https://www.dellin.ru/" target="_blank" rel="noopener noreferrer" className="link">Перейти на сайт «Деловые Линии»</a>
          </div>
          <div className="delivery-option">
            <h3>СДЭК</h3>
            <p>Доставка курьерской службой СДЭК позволяет получить ваш заказ быстро и удобно. Вы можете выбрать доставку до пункта выдачи или до двери.</p>
            <a href="https://www.cdek.ru/" target="_blank" rel="noopener noreferrer" className="link">Перейти на сайт СДЭК</a>
          </div>
        </section>

        <section className="payment-section">
          <h2>Оплата</h2>
          <div className="payment-option">
            <h3>Оплата по счету</h3>
            <p>После оформления заказа вам будет выставлен счет для оплаты. Оплата производится через банк. Обратите внимание, что заказ будет обработан только после поступления денежных средств на наш расчетный счет.</p>
          </div>
        </section>
      </div>
    </>
    
  );
};

export default DeliveryAndPayment;
