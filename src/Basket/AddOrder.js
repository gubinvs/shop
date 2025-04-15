import ApiUrl from '../js/ApiUrl.js';
import { v4 as uuidv4 } from 'uuid';


const addOrder = async (props) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
    // Получение номера заказа
    const numberOrderResponse = await fetch(`${ApiUrl}/api/NumberOrder`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    });

    if (!numberOrderResponse.ok) {
        throw new Error(`Ошибка HTTP: ${numberOrderResponse.status}`);
    }

    const numberOrder = await numberOrderResponse.text(); // Предполагаем, что ответ текстовый

    // Получение GUID пользователя
    const userResponse = await fetch(`${ApiUrl}/api/DefineUserGuidId`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
    });

    if (!userResponse.ok) {
        throw new Error(`Ошибка HTTP: ${userResponse.status}`);
    }

    const userData = await userResponse.json();
    const guidId = userData.message;

    if (!guidId) {
        throw new Error("GUID пользователя не найден в ответе");
    }

    const orderGuidId = uuidv4(); // Уникальный идентификатор заказа

    // Формирование данных для отправки
    const items = props.map((item) => ({
        GuidIdUser: guidId,
        GuidIdOrder: orderGuidId,
        GuidIdItem: item.guidId,
        VendorCode: item.vendorCode,
        NameItem: item.name,
        PriceItem: parseInt(item.price, 10),
        ImageItem: item.image,
        QuantityItem: parseInt(item.quantity, 10),
        NumberOrder: parseInt(numberOrder),
    }));

    //console.log("Отправляемые на сервер данные" + JSON.stringify(items));

    // Отправка данных
    const saveRequests = items.map((item) =>
        fetch(`${ApiUrl}/api/SaveOrder`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
        })
    );

    await Promise.all(saveRequests);

    //console.log("Все элементы успешно отправлены");

    // Очистка корзины и перенаправление пользователя
    localStorage.removeItem("basketItem");
    localStorage.removeItem("cart");
    window.location.href = "/DefineUser";

    } catch (error) {
        console.error("Ошибка при добавлении заказа:", error);
    }
};

export default addOrder;