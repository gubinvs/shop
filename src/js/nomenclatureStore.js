import ApiUrl from "./ApiUrl";
/// Скрипт загружает в фоновом режиме все данные о товарах, для дальнейшего использования в приложении,
/// компоненты уже фильтруют эти данные у себя сами


// nomenclatureStore.js
let nomenclature = [];
let loaded = false;

export async function loadNomenclature() {
  if (loaded) return nomenclature;
  const response = await fetch(ApiUrl + "/api/nomenclature");
  const data = await response.json();
  nomenclature = data;
  loaded = true;
  console.log("Номенклатура загружена:", data.length, "позиций");
  return nomenclature;
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