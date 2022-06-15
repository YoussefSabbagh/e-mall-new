import styles from "./ExchangeRate.module.scss";

const ExchangeRateTableHeader = () => {
  return (
    <thead className={styles.tableHead}>
      <tr className={styles.tableRow}>
        <th className={styles.tableCell}> Id </th>
        <th className={styles.tableCell}> Fecha </th>
        <th className={styles.tableCell}> Tasa </th>
        <th className={styles.tableCell}> Accion </th>
      </tr>
    </thead>
  );
};

export default ExchangeRateTableHeader;
