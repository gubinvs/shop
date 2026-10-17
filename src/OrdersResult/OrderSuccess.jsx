import React, { useEffect, useState } from 'react';
import './orderSuccess.css';

const OrderSuccess = ({ orderData }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Небольшая задержка для плавной анимации появления галочки
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Данные заказа (в реальности придут из пропсов или API)
  const order = orderData || {
    number: 'PA-2026-08742',
    amount: '148 920 ₽',
    date: '17 октября 2026',
    email: 'client@company.ru',
    items: [
      'Частотный преобразователь Siemens SINAMICS V20',
      'Контроллер ОВЕН ПЛК110',
      'Датчик давления Danfoss MBS 3000',
    ],
  };

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
      description: 'Комплектуем позиции на складе в Москве',
      status: 'active',
      icon: '📦',
    },
    {
      title: 'Передаём в доставку',
      description: 'Упакуем и передаём транспортной компании',
      status: 'pending',
      icon: '🚚',
    },
    {
      title: 'Доставлено',
      description: 'Заказ у вас на предприятии',
      status: 'pending',
      icon: '🏭',
    },
  ];

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
            Оплата получена. Спасибо за доверие — мы уже готовим ваше
            оборудование к отгрузке.
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
            <div className="order-detail">
              <span className="order-detail__label">Чек отправлен</span>
              <span className="order-detail__value">{order.email}</span>
            </div>
          </div>

          <div className="order-items">
            <h3>В составе заказа ({order.items.length} позиции)</h3>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  <span className="item-dot">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Стадии заказа (Timeline) */}
        <div className="stages-card">
          <h2>Стадии заказа</h2>
          <p className="stages-hint">
            Отслеживайте статус в любое время по ссылке{' '}
            <a href={`/orders/${order.number}`} className="stages-link">
              /orders/{order.number}
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
          <a href={`/orders/${order.number}`} className="btn btn-primary">
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
              Наш менеджер на связи с 9:00 до 19:00 по МСК. Поможём с
              документацией, подбором аналогов или сроками доставки.
            </p>
            <div className="support-contacts">
              <a href="tel:+78001234567">📞 8 (800) 123-45-67</a>
              <a href="mailto:support@yourshop.ru">✉️ support@yourshop.ru</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;