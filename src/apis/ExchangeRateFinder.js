const ExchangeRateFinder = {};

const URL = "https://s3.amazonaws.com/dolartoday/data.json";

ExchangeRateFinder.today = async () => {
  const response = await fetch(URL);
  const a = await response.json();
  return a.USD.promedio_real;
};

export default ExchangeRateFinder;
