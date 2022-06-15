import { useEffect, useState } from 'react';
import { FormatDate } from '../../utils/formats';

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import HelpersFinder from '../../apis/HelperFinder';

export const ChartExchangeRates = () => {
  const [exchangeRate, setExchangeRate] = useState({});
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await HelpersFinder.rate();
        setExchangeRate(response.data.reverse());
        setIsLoad(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchExchangeRate();
  }, []);

  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 100,
      },
      title: {
        display: true,
        text: 'Bs/US$',
      },
    },
  };

  const data = {
    labels: isLoad ? exchangeRate.map((date) => FormatDate(date.date)) : [],
    datasets: [
      {
        label: 'Bs./US$',
        data: isLoad ? exchangeRate.map((date) => date.rate) : [],
        backgroundColor: 'rgba(20, 240, 0, .7)',
        borderColor: 'rgba(20, 240, 0, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', padding: '2rem' }}>Tasas de Cambio</h1>
      {isLoad && <Bar data={data} options={options} />}
    </div>
  );
};
