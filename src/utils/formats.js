export const FormatDecimal = (value) =>
  new Intl.NumberFormat('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export const FormatDate = (isoString) => {
  const date = new Date(isoString);
  const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
  return new Intl.DateTimeFormat('es-VE', options).format(date);
};
