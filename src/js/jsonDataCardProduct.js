    
// export const jsonDataCardProductTest = [
//     {
//         chapter: "Автоматические выключатели",
//         images: [
//             "https://encomponent.ru/img/img-product/LC1D09M7/contactor-LC1D09M7.jpg",
//             "https://encomponent.ru/img/img-product/LC1D18M7/contactor-LC1D18M7.jpg",
//             "https://encomponent.ru/img/img-product/LC1D25M7/contactor-LC1D25M7.jpg"
//         ],
//         urlImgCard: "https://encomponent.ru/img/img-product/LC1D32M7/contactor-LC1D32M7.jpg",
//         priceGoods: 2500,
//         discr: "LC1D25M7, Электромеханический контактор - Schneider Electric kdfj kdjfgh kdsjgk sdkjg kajsdg kasjdgkjsdhgjh kasdjgkas",
//         urlPage: "/SearchResults?vendorCode=LC1D25M7",
//         gradeGoods: "5.0",
//         reviewsGoods: "230"
//     },
//     {
//         chapter: "Автоматические выключатели",
//         images: [
//             "https://encomponent.ru/img/img-product/LC1D09M7/contactor-LC1D09M7.jpg",
//             "https://encomponent.ru/img/img-product/LC1D18M7/contactor-LC1D18M7.jpg",
//             "https://encomponent.ru/img/img-product/LC1D25M7/contactor-LC1D25M7.jpg"
//         ],
//         urlImgCard: "https://encomponent.ru/img/img-product/LC1D32M7/contactor-LC1D32M7.jpg",
//         priceGoods: 2500,
//         discr: "LC1D25M7, Электромеханический контактор - Schneider Electric kdfj kdjfgh kdsjgk sdkjg kajsdg kasjdgkjsdhgjh kasdjgkas",
//         urlPage: "/SearchResults?vendorCode=LC1D25M7",
//         gradeGoods: "5.0",
//         reviewsGoods: "230"
//     },
//     {
//         chapter: "Автоматические выключатели",
//         images: [
//             "https://encomponent.ru/img/img-product/LC1D09M7/contactor-LC1D09M7.jpg",
//             "https://encomponent.ru/img/img-product/LC1D18M7/contactor-LC1D18M7.jpg",
//             "https://encomponent.ru/img/img-product/LC1D25M7/contactor-LC1D25M7.jpg"
//         ],
//         urlImgCard: "https://encomponent.ru/img/img-product/LC1D32M7/contactor-LC1D32M7.jpg",
//         priceGoods: 2500,
//         discr: "LC1D25M7, Электромеханический контактор - Schneider Electric kdfj kdjfgh kdsjgk sdkjg kajsdg kasjdgkjsdhgjh kasdjgkas",
//         urlPage: "/SearchResults?vendorCode=LC1D25M7",
//         gradeGoods: "5.0",
//         reviewsGoods: "230"
//     },
//     {
//         chapter: "Силовые контакторы",
//         images: [
//             "https://encomponent.ru/img/img-product/LC1D09M7/contactor-LC1D09M7.jpg",
//             "https://encomponent.ru/img/img-product/LC1D18M7/contactor-LC1D18M7.jpg",
//             "https://encomponent.ru/img/img-product/LC1D25M7/contactor-LC1D25M7.jpg"
//         ],
//         urlImgCard: "https://encomponent.ru/img/img-product/LC1D32M7/contactor-LC1D32M7.jpg",
//         priceGoods: 2500,
//         discr: "LC1D25M7, Электромеханический контактор - Schneider Electric kdfj kdjfgh kdsjgk sdkjg kajsdg kasjdgkjsdhgjh kasdjgkas",
//         urlPage: "/SearchResults?vendorCode=LC1D25M7",
//         gradeGoods: "5.0",
//         reviewsGoods: "230"
//     },
//     {
//         chapter: "Силовые контакторы",
//         images: [
//             "https://encomponent.ru/img/img-product/LC1D09M7/contactor-LC1D09M7.jpg",
//             "https://encomponent.ru/img/img-product/LC1D18M7/contactor-LC1D18M7.jpg",
//             "https://encomponent.ru/img/img-product/LC1D25M7/contactor-LC1D25M7.jpg"
//         ],
//         urlImgCard: "https://encomponent.ru/img/img-product/LC1D32M7/contactor-LC1D32M7.jpg",
//         priceGoods: 2500,
//         discr: "LC1D25M7, Электромеханический контактор - Schneider Electric kdfj kdjfgh kdsjgk sdkjg kajsdg kasjdgkjsdhgjh kasdjgkas",
//         urlPage: "/SearchResults?vendorCode=LC1D25M7",
//         gradeGoods: "5.0",
//         reviewsGoods: "230"
//     },
//     {
//         images: [
//             "https://encomponent.ru/img/img-product/LC1D09M7/contactor-LC1D09M7.jpg",
//             "https://encomponent.ru/img/img-product/LC1D18M7/contactor-LC1D18M7.jpg",
//             "https://encomponent.ru/img/img-product/LC1D25M7/contactor-LC1D25M7.jpg"
//         ],
//         urlImgCard: "https://encomponent.ru/img/img-product/LC1D32M7/contactor-LC1D32M7.jpg",
//         priceGoods: 2500,
//         discr: "LC1D25M7, Электромеханический контактор - Schneider Electric kdfj kdjfgh kdsjgk sdkjg kajsdg kasjdgkjsdhgjh kasdjgkas",
//         urlPage: "/SearchResults?vendorCode=LC1D25M7",
//         gradeGoods: "5.0",
//         reviewsGoods: "230"
//     }
// ];


import ApiUrl from "./ApiUrl.js";

export const jsonDataCardProduct = async () => {
    // Подставляем пароль прямо в URL (в конец пути), как в Swagger!
    const response = await fetch(`${ApiUrl}/api/ReturnDataCardProduct/MySuperToken123`, {
        method: "POST", // Метод остается POST, как требует сервер
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