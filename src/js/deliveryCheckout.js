

// Модель запроса
// {
//   "recipient": {
//     "phone_number": "string"
//   },
//   "postings": [
//     {
//       "request_id": 0,
//       "shipment_method_id": 0,
//       "cutoff_at": "2026-10-07T11:27:43.175Z",
//       "declared_value": {
//         "amount": "string",
//         "currency_code": "string"
//       },
//       "dimensions": {
//         "weight_g": 0,
//         "length_mm": 0,
//         "width_mm": 0,
//         "height_mm": 0
//       }
//     }
//   ],
//   "delivery": {
//     "delivery_point": {
//       "delivery_point_id": 0
//     }
//   }
// }



// Cкрипт проверяет возможность доставки до пункта ПВЗ
export const deliveryCheckout = (
    {
        phone,
        pointDestination,
        priceGoods 
        
    }
) => {

    // Очищаем телефон от маски и добавляем плюс в начало
    const cleanPhone = '+' + String(phone || '').replace(/\D/g, '');

    // Определим завтрашнюю дату 
    const tomorrow = new Date();
    // 1. Сдвигаем день на завтра
    tomorrow.setDate(tomorrow.getDate() + 1); 
    // 2. Устанавливаем время на 10:00:00.000 по UTC (Гринвичу)
    tomorrow.setUTCHours(10, 0, 0, 0);
    // 3. Переводим в формат ISO
    const resultTomorrow = tomorrow.toISOString();

    // Гарантируем, что ID придет числом, а цена — строкой
    const cleanPointId = Number(pointDestination) || 0;
    const cleanPrice = priceGoods ? String(priceGoods).trim() : "0";

    var reguest = {
        "recipient": {
            "phone_number": cleanPhone
        },
        "postings": [
        {
            "request_id": 106462, // Номер ПВЗ в который отдам!!, в дальнейшем менять!!!
            "shipment_method_id": 1020005028896210, // Прописываю в ручную но он может менятся, возможно потом делать запрос на свой апи и выбирать по умолчанию
            "cutoff_at": resultTomorrow,
            "declared_value": {
                "amount": cleanPrice, // СТРОКА!!!!!!
                "currency_code": "RUB"
            },
            "dimensions": {
                "weight_g": 1110,
                "length_mm": 110,
                "width_mm": 110,
                "height_mm": 10
            }
        }
    ],
    "delivery": {
        "delivery_point": {
        "delivery_point_id": cleanPointId
        }
    }};

    var regustJson = JSON.stringify(reguest);

    console.log(regustJson);
    return regustJson;
};
