import ApiUrl from "./ApiUrl";
/// Скрипт загружает в фоновом режиме все данные о товарах, для дальнейшего использования в приложении,
/// компоненты уже фильтруют эти данные у себя сами


// nomenclatureStore.js
let nomenclature = [];
let loaded = false;

export async function loadNomenclature() {
  
  if (loaded) return nomenclature;

  fetch(ApiUrl + "/api/Bestsellers", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
      })
      .then(response => response.json())
      .then(data => {
          const nomenclature = data.map(item => ({
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
          
          loaded = true;
          return nomenclature;
      })
      .catch(error => {
          console.error('Ошибка при загрузке данных:', error);
      });
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