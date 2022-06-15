import { useEffect, useState } from 'react';
import ExchangeMonitorFinder from '../../apis/ExchangeMonitorFinder';

const showData = [
  'petro',
  'bcv',
  'dolartoday',
  'remesas-zoom',
  'banco-mercantil',
  'banco-banesco',
  'monitor-dolar',
  'italcambio',
];

export const KPIs = () => {
  const [divisas, setDivisas] = useState({});

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await ExchangeMonitorFinder.all();
        setDivisas(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRates();
  }, []);

  let MainKPI;

  if (Object.keys(divisas).length > 0) {
    MainKPI = divisas.data.filter((divisa) => showData.includes(divisa.id));
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', padding: '2rem' }}>
        Principales Indicadores
      </h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
        }}
      >
        {MainKPI &&
          MainKPI.map((kpi) => (
            <div
              key={kpi.id}
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '.1rem 1rem',
              }}
            >
              <img
                style={{
                  width: '50px',
                }}
                src={kpi.icon}
                alt=""
              />
              <p
                style={{
                  fontSize: '1.5rem',
                }}
              >
                {kpi.data.rate}
              </p>
            </div>
          ))}
      </div>
      <small>
        ultima actualización {divisas['date-format']} - {divisas.calls}
      </small>
    </div>
  );
};
