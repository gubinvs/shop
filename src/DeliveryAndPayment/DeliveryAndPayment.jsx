import React from 'react';
import './DeliveryAndPayment.css';
import HeaderGuest from '../Header/HeaderGuest.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';

const DeliveryOption = ({ title, description, link, linkText }) => (
  <div className="delivery-option">
    <p className="delivery-option__discr">{description}</p>
    <a href={link} target="_blank" rel="noopener noreferrer" className="link">
      <b>{linkText}</b>
    </a>
  </div>
);

const PaymentOption = ({ title, description }) => (
  <div className="payment-option">
    <h3>{title}</h3>
    <p className="delivery-option__discr">{description}</p>
  </div>
);

const DeliveryAndPayment = () => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <>
      {isAuthenticated ? <Header /> : <HeaderGuest />}
      <div className="container delivery-payment-container">
        <div className="cart-component-container cart-component-container__main-block">
          <img
            src="../../images/delivery-page-images.jpg"
            className="cart-main-block__images"
            alt="Delivery"
          />
        </div>
        <h1>Условия доставки и оплаты:</h1>

        <section className="delivery-section">
          <h2 className="delivery-section__title">Мы сотрудничаем с надежными транспортными компаниями:</h2>
          <DeliveryOption
            title="Деловые Линии"
            description="Транспортная компания Деловые Линии идеально подходит для доставки крупногабаритных грузов и оптовых заказов. Сроки и стоимость перевозки зависят от региона и рассчитываются в индивидуальном порядке. Для вашего удобства доступна система отслеживания отправлений на официальном сайте, где вы всегда получите актуальную информацию о статусе вашего груза."
            link="https://www.dellin.ru/"
            linkText="Перейти на сайт «Деловые Линии»"
          />
          <DeliveryOption
            title="СДЭК"
            description="Компания СДЭК — наш надежный партнер для доставки небольших отправлений. Это отличный выбор для пересылки малогабаритных товаров как по России, так и за рубеж. Стоимость и сроки доставки определяются в зависимости от выбранного тарифа. Клиенты могут воспользоваться курьерской доставкой, самовывозом или постаматами. Все отправления можно отслеживать на официальном сайте."
            link="https://www.cdek.ru/"
            linkText="Перейти на сайт СДЭК"
          />
        </section>

        <section className="payment-section">
          <h2 className="delivery-section__title">Способы оплаты</h2>
          <PaymentOption
            title="Оплата по счету"
            description="После оформления заказа вам будет выставлен счет. Оплата осуществляется через банк. Заказ будет обработан и отправлен только после поступления средств на наш расчетный счет. Обратите внимание: мы ценим ваш выбор, и ваш заказ всегда будет готов к отправке в кратчайшие сроки."
          />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default DeliveryAndPayment;
