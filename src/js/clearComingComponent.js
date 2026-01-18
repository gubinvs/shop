import ApiUrl from './ApiUrl.js';

export const clearComingComponent = async (
    vendorCode,
    nameComponent,
    quantityGoods,
    itemPrice,
    noteDiscription
) => {

    const token = localStorage.getItem("token");
    if (!token) return;

    const item = {
        VendorCode: vendorCode,
        NameComponent: nameComponent,
        QuantityGoods: quantityGoods,
        ItemPrice: itemPrice,
        NoteDiscription: noteDiscription
    };

    try {
        // 1️⃣ Получаем GUID пользователя
        const userResponse = await fetch(`${ApiUrl}/api/DefineUserGuidId`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        });

        if (!userResponse.ok) {
            throw new Error(`Ошибка HTTP (DefineUserGuidId): ${userResponse.status}`);
        }

        const userData = await userResponse.json();
        const guidId = userData.message;

        if (!guidId) {
            throw new Error("GUID пользователя не найден");
        }

        // 2️⃣ Отправляем реализацию
        const response = await fetch(`${ApiUrl}/api/ConsumptionComponent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...item,
                Guid: guidId
            }),
        });

        if (!response.ok) {
            throw new Error(`Ошибка при сохранении данных: ${response.status}`);
        }

        alert("✅ Информация о реализации внесена в базу данных!");

    } catch (error) {
        console.error("Ошибка при добавлении данных о реализации товара:", error);
        alert("❌ Не удалось реализовать товар.");
    }
};
