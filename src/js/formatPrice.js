// Функция для формата в рублевый формат
export const formatPrice = (price) => {
return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 2,
}).format(price);
};