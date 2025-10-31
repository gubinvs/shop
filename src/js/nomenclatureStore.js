import ApiUrl from "./ApiUrl";
/// Скрипт загружает в фоновом режиме все данные о товарах, для дальнейшего использования в приложении,
/// компоненты уже фильтруют эти данные у себя сами


// nomenclatureStore.js
let nomenclature = [];
let loaded = false;

export async function loadNomenclature() {
    if (loaded) return nomenclature; // данные уже загружены

    try {
        const response = await fetch(ApiUrl + "/api/ReturnAllItem", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        // Обновляем глобальный массив
        nomenclature = data.map(item => ({
            id: item.id,
            imgLinkIconCard: item.imgLinkIconCard,
            vendorCode: item.vendorCode,
            nameComponent: item.nameComponent,
            quantity: item.quantity,
            linkPage: item.linkPage,
            price: item.price,
            basketImgPath: item.basketImgPath,
            guidId: item.guid,
            manufacturer: item.manufacturer
        }));
console.log(nomenclature);
        loaded = true;
        return nomenclature;

    } catch (err) {
        console.error("Ошибка загрузки номенклатуры:", err);
        return [];
    }
}

export function getNomenclature() {
    return nomenclature;
}

export function isLoaded() {
    return loaded;
}



/// Реализация в компоненте import { loadNomenclature, isLoaded } from "./js/nomenclatureStore";
///   useEffect(() => {
///    // Загружаем номенклатуру в фоне
///    loadNomenclature().then(() => {
///      setReady(true);
///    });
///  }, []);