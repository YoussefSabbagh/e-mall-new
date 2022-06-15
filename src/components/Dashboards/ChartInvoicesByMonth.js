import { useEffect, useState } from 'react';

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

import InvoicesFinder from '../../apis/invoicesFinder';

export const ChartInvoicesByMonth = ({
  year = new Date().getFullYear(),
  type = 1,
}) => {
  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const [data, setData] = useState([]);
  let title = type === 1 ? 'Cant. de Recibos' : ' US$ Cobrados';
  let color =
    type === 1
      ? { border: 'rgba(0, 0, 200, 1)', bg: 'rgba(0, 0, 200, .7)' }
      : { border: 'rgba(255, 0, 0, 1)', bg: 'rgba(255, 0, 0, .7)' };

  useEffect(() => {
    const fetchData = async (year) => {
      try {
        const response = await InvoicesFinder.paidByMonth(year);
        const newData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        if (type === 1) {
          response.data.invoices.map(
            (mes) => (newData[mes.Mes - 1] = mes.Cant)
          );
        } else {
          response.data.invoices.map(
            (mes) => (newData[mes.Mes - 1] = mes.amount)
          );
        }
        setData(newData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(year, type);
  }, [year, type]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 100,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const data1 = {
    labels: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ],
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: [color.bg],
        borderColor: [color.border],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', padding: '2rem' }}>
        Recibos Cobrados X Mes ({year})
      </h1>
      <Bar data={data1} options={options} />;
    </>
  );
};
