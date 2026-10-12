import ApiOzonService from "./ApiOzonService";

export const ozonPaymentPage = async (paymentData) => {
    try {
        // Правильно склеиваем базовый URL и эндпоинт
        const response = await fetch(`${ApiOzonService}/v1/OzonPay`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const result = await response.json();
        
        // Вместо return проверяем ссылку и делаем редирект.
        // Если бэкенд возвращает свойства с большой буквы, замени на result.PayUrl
        if (result && result.payUrl) {
            window.location.href = result.payUrl;
        } else if (result && result.PayUrl) {
            window.location.href = result.PayUrl;
        } else {
            throw new Error('Ссылка для оплаты (PayUrl) не найдена в ответе сервера.');
        }

    } catch (error) {
        console.error('Ошибка при отправке запроса в OzonPay:', error);
        throw error;
    }
};


// Пример запроса!
// const dataForBackend = {
//   amount: {
//     value: "1500.00" // --- ОБЩАЯ СУММА ТОВАРА
//   },
//   extId: "уникальный_id_заказа_123",
//   fiscalizationPhone: "+79991112233",
//   extData: {
//     comment: "Оплата заказа через сайт"
//   },
//   items: [
//     {
//       name: "Наименование товара",
//       quantity: 1,
//       price: {
//         value: "1500.00" // Передаем только цену за единицу
//       },
//       sku: 123456, // --- НЕ ОБЯЗАТЕЛЕН!
//       type: "TYPE_PRODUCT", // Или TYPE_SERVICE = услуга
//       vat: "VAT_22", // Ставка НДС VAT_NONE - безНДС
//       extId: "id_товара_в_системе" // Например ID в таблице или артикул??
//     }
//   ]
// };