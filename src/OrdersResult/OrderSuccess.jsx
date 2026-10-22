import React, { useEffect, useState } from 'react';
import './orderSuccess.css';
import {serverMarketUrl} from "../js/serverMarketUrl.js";
import ApiOzonService from '../js/ApiOzonService.js';

const OrderSuccess = () => {

  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Небольшая задержка для плавной анимации появления галочки
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const dataDay = new Date();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = dataDay.toLocaleDateString('ru-RU', options);
  
  // Данные заказа забираем информацию из localStorage
  const jsonPaymentData = localStorage.getItem("PaymentData")
  const paymentData = JSON.parse(jsonPaymentData);
  const [guidIdOrder, setGuidIdOrder] = useState(null);

  useEffect(() => {
    // Создаем асинхронную функцию внутри useEffect
    const fetchGuidOrder = async () => {
      try {
        // 1. Добавляем idOrder в конец URL, как в вашем curl-примере
        const response = await fetch(`${ApiOzonService}/v1/ReturnGuidOrderIndividuals?idOrder=${paymentData.extId}`, {
          method: 'POST',
          headers: {
            'accept': '*/*',
            // 'Content-Type': 'application/json' можно убрать, если тело (-d '') пустое,
            // но если сервер строго его требует, оставьте.
          },
          body: '' // Пустое тело, как в curl -d ''
        });

        //console.log(response);

        // 2. Проверяем статус ответа
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const guidResult = await response.text();
        //console.log('Полученный GUID заказа:', guidResult);

      // Сохраняем строку с GUID напрямую в стейт
      setGuidIdOrder(guidResult);

      } catch (error) {
        console.error('Ошибка при получении GUID:', error);
      }
    };

    fetchGuidOrder();
  }, []); // Добавляем idOrder в массив зависимостей, чтобы запрос повторялся при его изменении


  const order = {
      number: String(paymentData.extId), 
      // Форматируем в красивую денежную строку с пробелами между тысячами
      amount: new Intl.NumberFormat('ru-RU', { 
          style: 'currency', 
          currency: 'RUB', 
          minimumFractionDigits: 0 
      }).format(paymentData.amount.value / 100),
      date: formattedDate, // Текущая дата в формате '17 октября 2026'
      items: [
          paymentData.items[0].name
      ],
  };


  useEffect(() => {
    // 1. Создаем внутреннюю асинхронную функцию
    const updateOrder = async () => {
      try {
        // Записываем данные заказа для отправки на сервер
        const requestOrderDb = {
          id: String(paymentData.extId),
          status_order: "Собираем заказ",
          amount: String(paymentData.amount.value / 100),
          date_time: formattedDate,
          product_name: paymentData.items[0].name
        };
        
        // 2. Делаем асинхронный запрос с await
        const responseUpdatingOrder = await fetch(`${ApiOzonService}/v1/UpdatingOrderFromIndividuals`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestOrderDb),
        });

        // 3. Проверяем, успешно ли сервер принял данные
        if (!responseUpdatingOrder.ok) {
          const errorText = await responseUpdatingOrder.text();
          throw new Error(`Ошибка сервера (${responseUpdatingOrder.status}): ${errorText}`);
        }

        //console.log('Данные заказа успешно обновлены на сервере');
        
      } catch (error) {
        console.error('Не удалось обновить заказ:', error);
      }
    };

    // 4. Вызываем созданную функцию
    updateOrder();
    
  // В массив зависимостей важно добавить переменные, от которых зависит запрос,
  // чтобы избежать предупреждений линтера и устаревших замыканий (stale closures)
  }, [paymentData, formattedDate]); 


  // Стадии заказа
  const stages = [
    {
      title: 'Оплата получена',
      description: 'Деньги зачислены на наш расчётный счёт',
      status: 'done',
      icon: '✓',
    },
    {
      title: 'Собираем заказ',
      description: 'Комплектуем позиции на складе',
      status: 'active',
      icon: '📦',
    },
    {
      title: 'Передано в доставку',
      description: 'Упаковали и передали транспортной компании',
      status: 'pending',
      icon: '🚚',
    },
    {
      title: 'Доставлено',
      description: 'Заказ уже у вас',
      status: 'pending',
      icon: '🏭',
    },
  ];

  // В фоновом режиме записали данные о заказе в базу данных

  return (
    <div className="order-success-page">
      <div className="order-success-container">
        {/* HERO-секция с галочкой */}
        <div className="success-hero">
          <div className={`success-icon ${animated ? 'animated' : ''}`}>
            <svg viewBox="0 0 52 52" className="checkmark">
              <circle
                cx="26"
                cy="26"
                r="25"
                fill="none"
                className="checkmark__circle"
              />
              <path
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
                className="checkmark__check"
              />
            </svg>
          </div>
          <h1 className="success-title">Всё прошло успешно!</h1>
          <p className="success-subtitle">
            Оплата получена. Спасибо за доверие — мы уже готовим ваш
            заказ к отгрузке.
          </p>
        </div>

        {/* Карточка с деталями заказа */}
        <div className="order-card">
          <div className="order-card__header">
            <h2>Детали заказа</h2>
            <span className="order-badge">Оплачен</span>
          </div>

          <div className="order-details-grid">
            <div className="order-detail">
              <span className="order-detail__label">Номер заказа</span>
              <span className="order-detail__value">{order.number}</span>
            </div>
            <div className="order-detail">
              <span className="order-detail__label">Сумма</span>
              <span className="order-detail__value order-detail__value--accent">
                {order.amount}
              </span>
            </div>
            <div className="order-detail">
              <span className="order-detail__label">Дата оплаты</span>
              <span className="order-detail__value">{order.date}</span>
            </div>
             <div className="order-items">
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
          </div>

         
        </div>

        {/* Стадии заказа (Timeline) */}
        <div className="stages-card">
          <h2>Стадии заказа</h2>
          <p className="stages-hint">
            Отслеживайте статус в любое время по ссылке{' '}
            <a href={`${serverMarketUrl}/OrderStatus?guidIdOrder=${guidIdOrder}`} className="stages-link">
              {serverMarketUrl}/OrderStatus?guidIdOrder={guidIdOrder}
            </a>
          </p>

          <div className="timeline">
            {stages.map((stage, idx) => (
              <div
                key={idx}
                className={`timeline-step timeline-step--${stage.status}`}
              >
                <div className="timeline-marker">
                  <span className="timeline-icon">{stage.icon}</span>
                </div>
                {idx < stages.length - 1 && <div className="timeline-line" />}
                <div className="timeline-content">
                  <h4>{stage.title}</h4>
                  <p>{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="actions-block">
          <a href={`${serverMarketUrl}/OrderStatus?guidIdOrder=${guidIdOrder}`} className="btn btn-primary">
            Отслеживать заказ
          </a>
          <a href="/" className="btn btn-ghost">
            Вернуться в каталог
          </a>
        </div>

        {/* Блок поддержки */}
        <div className="support-block">
          <div className="support-icon">💬</div>
          <div className="support-text">
            <h4>Остались вопросы?</h4>
            <p>
              Наш менеджер на связи с 9:00 до 18:00 по МСК. Поможём с
              документацией, подбором аналогов или сроками доставки.
            </p>
            <div className="support-contacts">
              <a href="tel:+79215971">📞 +7 (812) 921-59-71</a>
              <a href="mailto:support@ec-market.ru">✉️ support@ec-market.ru</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;