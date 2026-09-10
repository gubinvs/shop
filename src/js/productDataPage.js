
import ApiUrl from '../js/ApiUrl.js';

// Функция загружает данные о товаре для отрисовки страницы товара
export const productDataPage = async (vendorCode) => { 
    
    if (!vendorCode) return null; 
    
    try { 
        const res = await fetch( 
            `${ApiUrl}/api/ReturnDataPageProduct?article=${vendorCode}`, 
            { method: "POST", headers: { "accept": "*/*" } } ); 
            
            if (!res.ok) { throw new Error(`HTTP error! status: ${res.status}`); } 
            
            const data = await res.json(); 
            
            return data;
            
    } catch (err) { console.log("Ошибка получения данных:", err); 
        return null; 
    } 
};