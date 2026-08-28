

// Функция добавления товара в корзину со страницы товара
// item - данные о товаре добавляемом в корзину
// urlParams - параметры страницы для ее обновления после добавления товара в корзину

export const addProductToCart = (item, urlParams) => {

    
    // Загрузим данные о товарах, которые уже находятся в корзине из хранилища браузера и конвертируем эти данные в массив
    const basketProduct = JSON.parse(localStorage.getItem('cart'));

    // Формируем запись для добавления данных в корзину
    const itemProduct = 
        {
            vendorCode: item.vendorCode,
            nameComponent:  item.nameComponent,
            quantity: 1,
            price: item.price,
            basketImgPath: item.basketImgPath,
            guidId: item.guidId,
            id: item.id
        } 
    ;

    // Объединяем предыдущие данные корзины с новым товаром
    const newItemProduct = [
        ...basketProduct,
        itemProduct
    ];

    // Записываем данные в хранилище браузера
    localStorage.setItem('cart', JSON.stringify(newItemProduct));
    
    //  Выводим посмотреть
    //console.log(newItemProduct);

    // Обновляем страницу товара
    window.location.href  = "/SearchResults?vendorCode=" + {urlParams};
};
