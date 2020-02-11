// L09.37 Создаем фильт для преобразования счета в разных валютах
export default function currencyFilter(value, currency = 'RUB') {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency // currency: currency
  }).format(value)
}