
// Константы и методы для выборки из базы данных комплектующих по группам

export const chapterMa = "Модульные автоматы";
export const chapterBp = "Блоки питания";
export const chapterK = "Клеммы и провода";
export const chapterSch = "Типовые решения";
export const chapterPlk = "Программируемые контроллеры";
export const chapterMplk = "Модули расширения";
export const chapterSl = "Сигнальные лампы";
export const chapterUps = "Устройства плавного пуска";

export const OpenSection = (param) => {
    window.location.href = "/CatalogSection/?chapter=" + param;
};