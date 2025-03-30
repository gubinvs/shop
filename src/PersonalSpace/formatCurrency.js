// utils.js
//Дополнительная утилита (например, для форматирования валюты):
export function formatCurrency(amount) {
  const rubles = Math.floor(amount);
  const kopecks = Math.round((amount - rubles) * 100);
  return `${rubles.toLocaleString("ru-RU")}.${kopecks.toString().padStart(2, "0")} руб`;
}
