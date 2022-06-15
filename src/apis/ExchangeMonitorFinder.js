import { divisas } from './bankData';

const ExchangeMonitorFinder = {};

// const URL = `https://exchangemonitor.net/api/ve?user=${process.env.REACT_APP_EXCHANGEMONITOR_USER}&token=${process.env.REACT_APP_EXCHANGEMONITOR_TOKEN}&currency=USD`;

ExchangeMonitorFinder.all = async () => {
  // const response = await fetch(URL);

  // return await response.json();
  return divisas;
};

export default ExchangeMonitorFinder;
