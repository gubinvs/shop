

// Добавление товаров в корзину
export function handleAddToBasket(item, countBasketItems, setNotificationText, setShowNotification) {
    try {
        const searchBasket = localStorage.getItem("search");
        let updatedBasket = [];

        if (searchBasket) {
            updatedBasket = JSON.parse(searchBasket);
            if (!Array.isArray(updatedBasket)) {
                updatedBasket = [];
            }
        }

        const existingItem = updatedBasket.find(b => b.id === item.id);

        if (existingItem) {
            existingItem.quantity = existingItem.quantity ? existingItem.quantity + 1 : 2;
        } else {
            updatedBasket.push({ ...item, quantity: 1 });
        }

        localStorage.setItem("search", JSON.stringify(updatedBasket));
        countBasketItems();

        setNotificationText(`Товар "${item.name}" добавлен в корзину`);
        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
        }, 2500);
    } catch (error) {
        console.error("Ошибка в handleAddToBasket:", error);
    }
}