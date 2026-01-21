import ApiUrl from './ApiUrl.js';


// Запись информации о оприходовании в базу данных
export const addComingComponent = async (
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

        // Отправляем запись о приходе
        const response = await fetch(`${ApiUrl}/api/AddComingComponent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Ошибка при сохранении данных: ${response.status}, ${text}`);
        }

        alert("✅ Информация оприходования внесена в базу данных!");

        window.location.href = "/ComingPage";

    } catch (error) {
        console.error("Ошибка при добавлении данных о оприходовании товара:", error);
        alert("❌ Не удалось оприходовать товар.");
    }
};
