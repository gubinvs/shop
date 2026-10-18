import React, { useEffect, useState } from 'react';
import './orderFailed.css';

const OrderFailed = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Данные заказа забираем информацию из localStorage
  const jsonPaymentData = localStorage.getItem("PaymentData")
  const paymentData = JSON.parse(jsonPaymentData);
  const dataDay = new Date();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = dataDay.toLocaleDateString('ru-RU', options);
  const paymentPage = localStorage.getItem("PaymentPage");

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
      ]
  };

  // Тип ошибки (может прийти из пропсов)
  const error = 'default';

  // Сообщения для разных типов ошибок
  const errorMessages = {
    insufficient_funds: {
      title: 'Недостаточно средств на счёте',
      description: 'Банк отклонил операцию — недостаточно средств для оплаты.',
      solutions: [
        'Пополните счет и попробуйте снова',
        'Используйте другой способ для оплаты',
        'Выберите оплату по счёту для юридического лица',
      ],
    },
    card_declined: {
      title: 'Карта отклонена банком',
      description: 'Банк не принял оплату. Это может быть из-за ограничений по операциям или безопасности.',
      solutions: [
        'Проверьте лимиты по карте в мобильном банке',
        'Попробуйте другую карту',
        'Свяжитесь с банком для уточнения причины',
      ],
    },
    expired_card: {
      title: 'Срок действия карты истёк',
      description: 'Карта, которую вы указали, больше не действительна.',
      solutions: [
        'Используйте другую активную карту',
        'Оплатите по счёту для юридического лица',
        'Выберите оплату при получении',
      ],
    },
    technical_error: {
      title: 'Техническая ошибка',
      description: 'Произошла ошибка при обработке платежа. Мы уже работаем над этим.',
      solutions: [
        'Подождите несколько минут и попробуйте снова',
        'Используйте другой способ оплаты',
        'Свяжитесь с нашей поддержкой',
      ],
    },
    default: {
      title: 'Оплата не прошла',
      description: 'К сожалению, не удалось завершить оплату. Пожалуйста, попробуйте другой способ.',
      solutions: [
        'Проверьте баланс карты',
        'Попробуйте другую карту',
        'Выберите оплату по счёту',
      ],
    },
  };

  const currentError = errorMessages[error] || errorMessages.default;

  return (
    <div className="order-failed-page">
      <div className="order-failed-container">
        {/* HERO-секция с иконкой предупреждения */}
        <div className="failed-hero">
          <div className={`failed-icon ${animated ? 'animated' : ''}`}>
            <svg viewBox="0 0 52 52" className="warning-icon">
              <circle
                cx="26"
                cy="26"
                r="25"
                fill="none"
                className="warning-circle"
              />
              <path
                d="M26 14v16"
                className="warning-line"
                strokeLinecap="round"
              />
              <circle cx="26" cy="38" r="1.5" className="warning-dot" />
            </svg>
          </div>
          <h1 className="failed-title">Оплата не прошла</h1>
          <p className="failed-subtitle">
            Не переживайте, заказ сохранён. Давайте разберёмся, что произошло.
          </p>
        </div>

        {/* Карточка с причиной */}
        <div className="error-card">
          <div className="error-card__header">
            <div className="error-icon-small">⚠️</div>
            <h2>{currentError.title}</h2>
          </div>
          <p className="error-description">{currentError.description}</p>

          <div className="solutions-block">
            <h3>Что можно сделать:</h3>
            <ul>
              {currentError.solutions.map((solution, idx) => (
                <li key={idx}>
                  <span className="solution-check">✓</span>
                  {solution}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Детали попытки оплаты */}
        <div className="order-card">
          <div className="order-card__header">
            <h2>Детали попытки оплаты</h2>
            <span className="order-badge order-badge--failed">Не оплачен</span>
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
              <span className="order-detail__label">Дата попытки</span>
              <span className="order-detail__value">{order.date}</span>
            </div>
            {/* <div className="order-detail">
              <span className="order-detail__label">Способ оплаты</span>
              <span className="order-detail__value">{order.paymentMethod}</span>
            </div> */}
          </div>

          <div className="notice-block">
            <span className="notice-icon">ℹ️</span>
            <p>
              <strong>Важная информация об оплате:</strong> Уведомляем, что денежные средства не были удержаны. 
              Поскольку в системе зафиксирована проблемная транзакция, заказ на доставку не сформировался. 
              При отсутствии активной заявки платёжный шлюз автоматически аннулирует операцию. 
              Возврат средств на ваш счет будет произведен в течение текущих суток.
            </p>
          </div>
        </div>

        {/* Частые причины */}
        <div className="faq-card">
          <h2>Частые причины отказа</h2>
          <div className="faq-list">
            <details className="faq-item">
              <summary>Почему банк отклонил карту?</summary>
              <p>
                Банки могут отклонять операции из-за лимитов, подозрительной
                активности или ограничений по определённым категориям товаров.
                Проверьте настройки в мобильном банке.
              </p>
            </details>
            <details className="faq-item">
              <summary>Безопасно ли пробовать снова?</summary>
              <p>
                Да, все платежи защищены шифрованием. Если проблема была
                временной, повторная попытка пройдёт успешно.
              </p>
            </details>
            <details className="faq-item">
              <summary>Можно ли оплатить по счёту?</summary>
              <p>
                Конечно! Для юридических лиц доступна оплата по счёту. Выберите
                этот способ при оформлении заказа — мы выставим счёт. Для юридических 
                лиц необходима регистрация. А для оформления заказа необходимо добавить товары в корзину.
              </p>
            </details>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="actions-block">
          <a href={paymentPage} className="btn btn-primary">
            Попробовать оплатить снова
          </a>
          <a href="/" className="btn btn-ghost">
            Вернуться в магазин
          </a>
        </div>

        {/* Блок поддержки */}
        <div className="support-block">
          <div className="support-icon">🆘</div>
          <div className="support-text">
            <h4>Нужна помощь с оплатой?</h4>
            <p>
              Наш менеджер поможет разобраться в ситуации, подберёт удобный
              способ оплаты или оформит заказ по счёту для вашей компании.
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

export default OrderFailed;