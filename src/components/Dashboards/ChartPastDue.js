import { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import InvoicesFinder from '../../apis/invoicesFinder';

export const ChartPastDue = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const [data, setData] = useState([250, 58, 0, 0, 28]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(false);
      try {
        const response = await InvoicesFinder.pastDue();
        const hardData = [
          response.data.invoices[0]['CurrentBalance'],
          response.data.invoices[0]['30-60'],
          response.data.invoices[0]['60-90'],
          response.data.invoices[0]['90-120'],
          response.data.invoices[0]['120+'],
        ];

        setData(hardData);
        setIsFetching(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'US$ vencidos',
      },
    },
  };

  let data1;

  if (isFetching) {
    data1 = {
      labels: ['<30', '30-60', '60-90', '90-120', '+120'],
      datasets: [
        {
          label: 'US$',
          data,
          borderColor: 'rgb(25, 99, 12)',
          backgroundColor: 'rgba(25, 99, 12, 0.5)',
        },
      ],
    };
  }

  return (
    <>
      <h1 style={{ textAlign: 'center', padding: '2rem' }}>
        Analisis de Vencimiento
      </h1>
      {isFetching && <Bar options={options} data={data1} />}
    </>
  );
};
