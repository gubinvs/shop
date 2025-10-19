import ApiUrl from '../js/ApiUrl.js';
import { v4 as uuidv4 } from 'uuid';

const addOrder = async (props) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    // Получаем номер заказа
    const numberOrderResponse = await fetch(`${ApiUrl}/api/NumberOrder`);
    if (!numberOrderResponse.ok) throw new Error(`Ошибка HTTP: ${numberOrderResponse.status}`);
    const numberOrder = await numberOrderResponse.text();

    // Получаем GUID пользователя
    const userResponse = await fetch(`${ApiUrl}/api/DefineUserGuidId`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    if (!userResponse.ok) throw new Error(`Ошибка HTTP: ${userResponse.status}`);
    const userData = await userResponse.json();
    const guidId = userData.message;
    if (!guidId) throw new Error("GUID пользователя не найден");

    const orderGuidId = uuidv4(); // уникальный ID заказа

    // Формируем тело запроса
    const items = props.map((item) => ({
      GuidIdUser: guidId,
      GuidIdOrder: orderGuidId,
      GuidIdItem: item.guidId || item.guid || item.GuidId || null,
      VendorCode: item.vendorCode || item.VendorCode,
      NameItem: item.name || item.nameComponent || "Без названия",
      PriceItem: parseInt(item.price, 10) || 0,
      ImageItem: item.image || item.basketImgPath || "",
      QuantityItem: parseInt(item.quantity, 10) || 1,
      NumberOrder: parseInt(numberOrder),
    }));

    console.log("📦 Отправляем заказ:", items);

    // Отправляем одним запросом
    const response = await fetch(`${ApiUrl}/api/SaveOrder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    });

    if (!response.ok) throw new Error(`Ошибка при сохранении заказа: ${response.status}`);

    alert("✅ Заказ успешно оформлен!");
    localStorage.removeItem("cart");
    window.location.href = "/DefineUser";

  } catch (error) {
    console.error("Ошибка при добавлении заказа:", error);
    alert("❌ Не удалось оформить заказ. Проверьте данные или соединение.");
  }
};

export default addOrder;
