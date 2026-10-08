import React, { useState } from 'react';
import axios from 'axios';

const SberPaymentPage = ({ totalAmount }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Отправляем запрос на твой C# бэкенд
      // Снабжаем правильным URL (зависит от портов твоего IIS / Kestrel)
      const response = await axios.post('/api/payment/register', {
        amount: totalAmount // Передаем обычную сумму (например, 1450.50)
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
    <div style={{ marginTop: '20px' }}>
      <button 
        onClick={handlePayment} 
        disabled={loading}
        style={{
          backgroundColor: '#21a038',
          color: '#fff',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        {loading ? 'Сессия создается...' : `Оплатить ${totalAmount} ₽ через Сбер`}
      </button>
      
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default SberPaymentPage;
