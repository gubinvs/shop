import ApiUrl from "./ApiUrl.js";

// Запрос на сервер для получения данных для карточек товаров

export const jsonDataCardProduct = async () => {
    // Подставляем пароль прямо в URL (в конец пути), как в Swagger!
    const response = await fetch(`${ApiUrl}/api/ReturnDataCardProduct/MySuperToken123`, {
        method: "POST",
        headers: {
            "accept": "*/*"
        }
    });

    if (!response.ok) {
        throw new Error("Ошибка запроса: " + response.status);
    }

    const data = await response.json();
    
    return data;
};