import { useEffect, useState } from 'react';
//react-chartjs-2.netlify.app/examples/pie-chart

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import InvoicesFinder from '../../apis/invoicesFinder';

export const ChartInvoicesByMethod = ({ year = new Date().getFullYear() }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchData = async (year) => {
      try {
        const response = await InvoicesFinder.paidByMethod(year);
        const newData = [];
        const newLabels = [];
        response.data.invoices.map((payMethod) => {
          newData.push(payMethod.Cant);
          newLabels.push(payMethod.payment_method);
          return 'ok';
        });
        setData(newData);
        setLabels(newLabels);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(year);
  }, [year]);

  const dataPie = {
    labels: labels,
    datasets: [
      {
        label: 'Cant. de Recibos',
        data: data,
        backgroundColor: [
          'rgba(255, 19, 132, 0.5)',
          'rgba(4, 162, 235, 0.5)',
          'rgba(255, 10, 30, 0.5)',
          'rgba(255, 255, 30, 0.5)',
          'rgba(63, 191, 122, 0.5)',
        ],
        borderColor: [
          'rgba(255, 19, 132, 1)',
          'rgba(4, 162, 235, 1)',
          'rgba(255, 10, 30, 1)',
          'rgba(255, 255,   30, 1)',
          'rgba(63, 191, 122, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', padding: '2rem' }}>
        Recibos Cobrados X Metodo de Pago ({year})
      </h1>
      <div style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
        <Pie data={dataPie} />
      </div>
    </>
  );
};
