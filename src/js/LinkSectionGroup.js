
// Константы и методы для выборки из базы данных комплектующих по группам

export const chapterMa = "Модульное оборудование";
export const chapterBp = "Блоки питания";
export const chapterK = "Средства монтажа";
export const chapterSch = "Силовые автоматические выключатели";
export const chapterPlk = "Программируемые контроллеры";
export const chapterMplk = "Модули расширения";
export const chapterSl = "Индикация";
export const chapterUps = "Устройства плавного пуска";
export const chapterRecord = "Средства измерения и учета";
export const chapterHighVoltage = "Оборудование высоковольтное";

export const OpenSection = (param) => {
    window.location.href = "/CatalogSection/?chapter=" + param;
};