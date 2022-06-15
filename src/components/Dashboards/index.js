import styles from './dashboard.module.scss';
import { ChartInvoicesByMonth } from './ChartInvoicesByMonth';
import { ChartInvoicesByMethod } from './ChartInvoicesByMethod';
import { ChartExchangeRates } from './ChartExchangeRates';
import { KPIs } from './KPIs';
import { ChartPastDue } from './ChartPastDue';

export const Dashboard = () => {
  return (
    <section className={styles.container}>
      <article className={styles.card}>
        <KPIs />
      </article>

      <article className={styles.card}>
        <ChartPastDue />
      </article>

      <article className={styles.card}>
        <ChartInvoicesByMethod />
      </article>

      <article className={styles.card}>
        <ChartInvoicesByMonth year={2021} type={1} />
      </article>

      <article className={styles.card}>
        <ChartInvoicesByMonth type={2} />
      </article>

      <article className={styles.card}>
        <ChartExchangeRates />
      </article>
    </section>
  );
};

export default Dashboard;
