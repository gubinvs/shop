import ApiOzonService from "./ApiOzonService";
import ApiUrl from "./ApiUrl.js";

export const ozonPaymentPage = async ({dataComponent, offer, phone, priceGoods, quantity, deliveryPrice}) => {
    // Функция форматирования телефона: оставляет только плюс и цифры
    const formatPhone = (phoneStr) => {
        if (!phoneStr) return "";
        const cleaned = phoneStr.replace(/[^\d+]/g, ''); // Удаляет пробелы, дефисы, скобки
        return cleaned.startsWith('8') ? '+7' + cleaned.slice(1) : cleaned;
    };

    // Функция очистки имени товара под требования Ozon Pay
    const cleanItemName = (vendorCode, nameComponent) => {
        let fullName = `${vendorCode || ''}, ${nameComponent || ''}`.trim();
        
        // 1. Заменяем спецсимволы (длинные тире, кавычки-ёлочки и т.д.) на обычные дефисы и пробелы
        fullName = fullName
            .replace(/[—–−]/g, '-') // Заменяем любые длинные тире на обычный дефис
            .replace(/[«»"']/g, '')  // Удаляем кавычки, которые могут ломать парсинг
            .replace(/\s+/g, ' ');   // Схлопываем двойные пробелы

        // 2. Ozon Pay строго ограничивает длину названия до 128 символов
        if (fullName.length > 128) {
            fullName = fullName.substring(0, 125) + '...';
        }
        
        return fullName || 'Электротехнический компонент';
    };


  // 1. Получаем номер заказа с вашего сервера
    let extIdString = `draft_\${Date.now()}`; // Лучше генерировать временный уникальный ID вместо "0"
    
    try {
        // ДОБАВЛЕН await и правильная шаблонная строка `` с переменной \${ApiUrl}
        const orderNumResponse = await fetch(`${ApiUrl}/api/NumberOrder`);
        
        // Теперь orderNumResponse — это реальный ответ сервера, у него есть .ok
        if (orderNumResponse.ok) {
            // ДОБАВЛЕН await для чтения тела ответа
            const orderNum = await orderNumResponse.json(); 
            
            extIdString = String(orderNum); // Принудительно приводим к строке "1482"
            console.log("Успешно получен номер заказа от сервера:", extIdString);
        } else {
            console.warn(`Сервер ответил статусом ${orderNumResponse.status}, используем временный ID: ${extIdString}`);
        }
    } catch (numError) {
        console.warn('Не удалось получить номер заказа с сервера (ошибка сети/запроса), используем временный ID', numError);
    }
    

        // Сборка валидного paymentData
    var paymentData = {
        amount: {
            value: String(offer)
        },
        extId: extIdString,
        fiscalizationPhone: formatPhone(phone), 
        extData: {
            comment: "Оплата на ec-market.ru"
        },
        items: [
            {
                // ИСПРАВЛЕНО: Теперь имя гарантированно очищено и не превышает 128 символов
                name: cleanItemName(dataComponent?.NameComponent),
                quantity: quantity || 1, 
                price: {
                    value: String(priceGoods) 
                },
                type: "TYPE_PRODUCT",
                vat: "VAT_22",
                extId: String(dataComponent?.Id || '0') 
            },
            {
                name: "Озон доставка до ПВЗ",
                quantity: 1, 
                price: {
                    value: String(deliveryPrice) 
                },
                type: "TYPE_SERVICE",
                vat: "VAT_22",
                extId: "delivery_ozon" 
            }
        ]
    };

    console.log(paymentData);

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