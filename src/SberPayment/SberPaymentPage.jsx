import React, { useState } from 'react';
import "./sberPaymentPage.css";
import axios from 'axios';
import ApiOzonService from '../js/ApiOzonService';

const SberPaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalPrice = 25000;

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Отправляем запрос на твой C# бэкенд
      // Снабжаем правильным URL (зависит от портов твоего IIS / Kestrel)
      const response = await axios.post(ApiOzonService + '/v1/PaymentSber', {
          amount: totalPrice // Передаем обычную сумму (например, 1450.50)
      });

      const { formUrl } = response.data;

      if (formUrl) {
        // Редиректим пользователя на шлюз Сбера для ввода карты/SberPay
        window.location.href = formUrl;
      } else {
        throw new Error('Ссылка на оплату не получена');
      }
    } catch (err) {
      console.error('Ошибка при создании сессии оплаты:', err);
      setError(err.response?.data?.message || 'Не удалось запустить процесс оплаты');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='sber-payment-page-section'>
      <button 
        onClick={handlePayment} 
        disabled={loading}
        className='sber-payment-page-section__button'
      >
        {loading ? 'Сессия создается...' : `Оплатить ${totalPrice} ₽ через Сбер`}
      </button>
      
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default SberPaymentPage;