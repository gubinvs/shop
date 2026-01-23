import ApiUrl from "./ApiUrl";


// Обновление цены на сайте магазина
export const priceUpdateWebsite = async (guidItme, priceItem)=> {

    // Преобразуем price по правилам математики в целое число
    const intValue = Math.round(priceItem); // 325

    // Подготовим данные к отправке
    const regust = {
        guid: guidItme,
        price: intValue
    };

    // Отправляем данные на сервер
    try {

        // Отправляем запись о приходе
        const response = await fetch(`${ApiUrl}/api/PriceUpdateWebsite`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(regust),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Ошибка при обновлении цены: ${response.status}, ${text}`);
        }

        alert("✅ Информация о новой цене внесена в базу данных!");

    } catch (error) {
        alert("❌ Не удалось обновить цену.");
    }
};