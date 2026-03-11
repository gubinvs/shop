import ApiUrl from "./ApiUrl.js";


/// Запрашивает данные о сумме общей закупки и общей сумме продаж,
/// принимает наименование контроллера и возвращает число

export const totalPriceRequest = async (apiController) => {
    const response = await fetch(
        `${ApiUrl}/api/${apiController}/MySuperToken123`
    );

    if (!response.ok) {
        throw new Error("Ошибка запроса: " + response.status);
    }

    const data = await response.json();

    return data;
};