import ApiUrl from './ApiUrl.js';


// Запись информации о оприходовании в базу данных
export const addComingComponent =(
    {
        vendorCode,
        nameComponent

    })=> {

    const token = localStorage.getItem("token");
    if (!token) return;  

    // Формируем тело запроса
    const item = {
        VendorCode: vendorCode,
        NameComponent: nameComponent

    };

    console.log(item);

    try {

        // Получаем GUID пользователя
        const userResponse = fetch(`${ApiUrl}/api/DefineUserGuidId`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        });

        if (!userResponse.ok) throw new Error(`Ошибка HTTP: ${userResponse.status}`);
        const userData = userResponse.json();
        const guidId = userData.message;

        if (!guidId) throw new Error("GUID пользователя не найден");

 

        // Отправляем одним запросом
        const response = fetch(`${ApiUrl}/api/AddComingComponent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
        });

        if (!response.ok) throw new Error(`Ошибка при сохранении данных: ${response.status}`);

        alert("✅ Информация внесена в базу данных!");

        } catch (error) {
            console.error("Ошибка при добавлении данных о оприходовании товара:", error);
            alert("❌ Не удалось оприходовать товар.");
        }
    
};