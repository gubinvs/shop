import React from 'react';
import { useNavigate } from 'react-router-dom';
import './deliveryAndPayment.css';
import HeaderGuest from '../Header/HeaderGuest.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';

// Карточка для доставки
const DeliveryOption = ({ icon, title, description, link, linkText }) => (
  <div className="delivery-option-card">
    <div className="delivery-option-card__title-block">
        <img className="delivery-option-card__icon" src={icon} alt="Icon" />
        <h3 className="delivery-option-card__title">{title}</h3>
    </div>
    <p className="delivery-option-card__description">{description}</p>
    
    {link && linkText && (
      <a href={link} target="_blank" rel="noopener noreferrer" className="delivery-option-card__link">
        {linkText}
      </a>
    )}
  </div>
);

// Карточка для оплаты
const PaymentOption = ({ icon, title, description }) => (
  <div className="payment-option-card">
    <div className="payment-option-card__title-block">
        <div className="payment-option-card__icon">{icon}</div>
        <h3 className="payment-option-card__title">{title}</h3>
    </div>
    
    <p className="payment-option-card__description">{description}</p>
  </div>
);

const DeliveryAndPayment = () => {
    const isAuthenticated = localStorage.getItem('token') !== null;

    const handleCompanyDataClick = () => {
      navigate('/CompanyDashboard');
    };

    const navigate = useNavigate();

  return (
    <>
      {isAuthenticated ? <Header /> : <HeaderGuest />}
      <section className="delivery-payment-section">
          <div className="container delivery-payment__container">
            <div className="delivery-payment__main-block">
              <img
                src="../../images/delivery-page-images.jpg"
                className="dp-main-block__images"
                alt="Delivery"
              />
            </div>
            <h1>Способы доставки:</h1>
            <div className="delivery-section">
                {/* <h2 className="delivery-section__title">Cотрудничаем с надежными транспортными компаниями:</h2> */}
                <div className="delivery-options-wrapper">
                  <DeliveryOption
                    icon="../../images/icon/dellin-icon-delivery.jpg"
                    title="Деловые Линии"
                    description="Транспортная компания Деловые Линии идеально подходит для доставки крупногабаритных грузов и оптовых заказов. Сроки и стоимость перевозки зависят от региона и рассчитываются в индивидуальном порядке. Для вашего удобства доступна система отслеживания отправлений на официальном сайте, где вы всегда получите актуальную информацию о статусе вашего груза."
                    link="https://www.dellin.ru/"
                    linkText="Перейти на сайт"
                  />
                  <DeliveryOption
                    icon="../../images/icon/cdek-icon-delivery.jpg"
                    title="СДЭК"
                    description="Компания СДЭК — наш надежный партнер для доставки небольших отправлений. Это отличный выбор для пересылки малогабаритных товаров как по России, так и за рубеж. Стоимость и сроки доставки определяются в зависимости от выбранного тарифа. Клиенты могут воспользоваться курьерской доставкой, самовывозом или постаматами. Все отправления можно отслеживать на официальном сайте."
                    link="https://www.cdek.ru/"
                    linkText="Перейти на сайт"
                  />
                  <DeliveryOption
                    icon="../../images/icon/ozon-icon-delivery.jpg"
                    title="OZON"
                    description="Ozon — это синоним максимального удобства и доступности для каждого покупателя. Совершая покупки в нашем магазине, вы получаете аналогичный, привычный и надежный сервис. Заказы отправляются через развитую сеть Ozon, что гарантирует быструю доставку в любой регион. Клиенты могут выбрать наиболее удобный способ получения: забрать посылку в одном из тысяч пунктов выдачи (ПВЗ) рядом с домом"
                    link="https://dostavka.ozon.ru/?__rr=1"
                    linkText="Перейти на сайт"
                  />
                </div>
            </div>

            <div className="payment-section">
                <h2 className="delivery-section__title">Способы оплаты</h2>
                <div className="payment-section__container">
                    <div className="payment-options-wrapper payment-options-wrapper_card">
                      <PaymentOption
                        icon="💳"
                        title="Оплата на сайте"
                        description="Вы можете оплатить заказ прямо на сайте в один клик с помощью Ozon Pay. Как только оплата пройдет, мы мгновенно возьмем ваш заказ в работу и отправим его через Ozon Delivery прямо в пункт выдачи заказов (ПВЗ) рядом с вашим домом. "
                      />
                    </div>
                    <div className="payment-options-wrapper">
                      <PaymentOption
                        icon="🏦"
                        title="Оплата по счету"
                        description="Счет для оплаты придет вам сразу после оформления заказа. Вы сможете оплатить его через ваш банк. Мы сразу же начнем собирать ваш заказ и отправим его, как только деньги поступят на наш счет. Большое спасибо за доверие к нам — мы сделаем все возможное, чтобы ваша посылка была готова к отправке как можно скорее!"
                      />
                    </div>
                </div>

                {/* Новый блок с призывом заполнить данные компании */}
                <div className="company-data-info">
                  <p>
                    Чтобы мы могли <strong>быстрее обработать ваш заказ, выставить счет и сформировать отправку</strong>, 
                    пожалуйста, заполните данные вашей компании.
                  </p>
                  <button onClick={handleCompanyDataClick} className="company-data-button">
                    Перейти к заполнению данных о компании
                  </button>
                </div>

            </div>
          </div>
      </section>
      <Footer />
    </>
  );
};

export default DeliveryAndPayment;
