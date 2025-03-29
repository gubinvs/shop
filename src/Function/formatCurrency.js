/// Преобразование числа в рубли
function formatCurrency(amount) {
const rubles = Math.floor(amount); // Целая часть числа (рубли)
const kopecks = Math.round((amount - rubles) * 100); // Дробная часть числа (копейки)

return `${rubles.toLocaleString("ru-RU")}.${kopecks
    .toString()
    .padStart(2, "0")} руб`; // Форматирование строки
}