import ApiOzonService from "./ApiOzonService";

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
    let extIdString = `draft_${Date.now()}`; // Временный ID на случай сбоя
    const myPassword = "7cca3d97-1f11-43ba-b82d-bb6b7ddf8056"; // Укажите актуальный пароль

    try {
        // Передаем пароль прямо в строке запроса: ?passsw=наш_пароль
        const url = `${ApiOzonService}/v1/ReservationOrderNumber?passsw=${encodeURIComponent(myPassword)}`;
        
        const orderNumResponse = await fetch(url);
        var orderNumber;
        if (orderNumResponse.ok) {
            // Читаем JSON-ответ от сервера (там прилетит { id: 123, message: "..." })
            const data = await orderNumResponse.json(); 

            orderNumber = data.id; // Запомним номер в числовом формате

            if (data && data.id) {
                extIdString = String(data.id); // Принудительно приводим ID к строке (например, "1482")
                console.log("Успешно получен номер заказа от сервера:", extIdString);
            } else {
                console.warn("Сервер вернул успешный статус, но внутри нет id:", data);
            }
        } else {
            // Если пароль не подошел, сработает эта ветка
            const errorData = await orderNumResponse.json().catch(() => ({}));
            console.warn(`Сервер ответил ошибкой ${orderNumResponse.status}: ${errorData.message || ''}. Используем временный ID: ${extIdString}`);
        }
    } catch (numError) {
        console.warn('Не удалось получить номер заказа с сервера (ошибка сети/запроса), используем временный ID', numError);
    }
    
    // Сборка валидного paymentData
    var paymentData = {
        amount: {
            value: String(offer*100) // так как сервер ОЗОН делит на 100)) 
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
                    value: String(priceGoods*100) // так как сервер ОЗОН делит на 100)) 
                },
                type: "TYPE_PRODUCT", // Идентификатор товара
                vat: "VAT_0",
                extId: String(dataComponent?.Id || '0') 
            },
            {
                name: "Озон доставка до ПВЗ",
                quantity: 1, 
                price: {
                    value: String(deliveryPrice*100) // так как сервер ОЗОН делит на 100)) 
                },
                type: "TYPE_SERVICE", // Идентификатор услуги
                vat: "VAT_0", // НДС 
                extId: "delivery_ozon" 
            }
        ]
    };

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
        

        // Запишем телефон покупателя в базу данных 
        var newOrder = { 
            // Берем ID заказа, который мы получили от сервера (extIdString)
            id: orderNumber ?? 0, 
            
            // Телефон гарантированно берем из отформатированного свойства
            phone_user: paymentData.fiscalizationPhone || "", 
            
            // Напишите стартовый статус string, чтобы апи сервер не обновлял данное поле в базе данных"
            status_order: "string" 
        };

        const responseUpdatingOrder = await fetch(`${ApiOzonService}/v1/UpdatingOrderFromIndividuals`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOrder),
        });



        //  Оформим доставку в ОЗОН Доставке
        var reguestDelivery = {
            "order_external_id": "string",
            "recipient": {
                "phone_number": "string",
                "full_name": "string"
            },
            "delivery": {
                "delivery_point": {
                "delivery_point_id": 0
                }
            },
            "postings": [
                {
                "request_id": 0,
                "posting_external_id": "string",
                "shipment_method_id": 0,
                "description": "string",
                "declared_value": {
                    "amount": "string",
                    "currency_code": "string"
                },
                "cutoff_at": "2026-10-14T06:38:10.013Z",
                "dimensions": {
                    "weight_g": 0,
                    "length_mm": 0,
                    "width_mm": 0,
                    "height_mm": 0
                }
                }
            ] 
        }
    

        const responseDeliveryOrder = await fetch(`${ApiOzonService}/v1/DeliveryOrderCreate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reguestDelivery),
        });


        // Вместо return проверяем ссылку и делаем редирект.
        // Если бэкенд возвращает свойства с большой буквы, заменим на result.PayUrl
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