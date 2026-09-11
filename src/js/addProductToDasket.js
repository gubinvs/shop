


// Функция добавления товара в корзину со страницы товара
export const addProductToDasket = (item) => {
    
    // 1. Получаем данные и безопасно обрабатываем null (если корзина пустая, возвращаем пустой массив)
    const basket = JSON.parse(localStorage.getItem('cart')) || [];

    // 2. Проверяем, есть ли уже такой товар в корзине (по id или guidId)
    const existingItemIndex = basket.findIndex(cartItem => cartItem.id === item.Id);

    let newBasket;

    if (existingItemIndex > -1) {
        // Если товар найден, создаем копию массива и увеличиваем количество
        newBasket = [...basket];
        newBasket[existingItemIndex].quantity += 1;
    } else {
        // Если товара нет, формируем объект и добавляем в массив
        const newItem = {
            vendorCode: item.VendorCode,
            nameComponent: item.NameComponent,
            quantity: 1,
            price: item.Price,
            basketImgPath: item.BasketImgPath,
            guidId: item.GuidId,
            id: item.Id
        };
        newBasket = [...basket, newItem];
    }

    // 3. Сохраняем обновленный массив обратно в localStorage
    localStorage.setItem('cart', JSON.stringify(newBasket));

};