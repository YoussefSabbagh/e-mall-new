import styles from './ExchangeRate.module.scss';
import { FaPlus, FaCheck, FaBan } from 'react-icons/fa';

const ExchangeRateRowUpdate = ({
  accion,
  exchangeRate,
  handleEditChange,
  handleEditSubmit,
  handleCancel,
}) => {
  const fecha = exchangeRate.date.slice(0, 10);

  return (
    <tr className={styles.tableRow}>
      <td className={styles.tableCell} data-col-title="Id">
        {exchangeRate._id}
      </td>
      <td className={styles.tableCell} data-col-title="Fecha">
        <input
          className={styles.input}
          type="date"
          name="date"
          value={fecha}
          placeholder=" Ingrese la fecha"
          onChange={handleEditChange}
        />
      </td>
      <td className={styles.tableCell} data-col-title="Tasa">
        <input
          className={styles.input}
          required
          name="rate"
          value={exchangeRate.rate}
          placeholder=" Ingrese la tasa"
          onChange={handleEditChange}
        />
      </td>

      <td
        className={`${styles.tableCell} ${styles.tableAccion}`}
        data-col-title="Accion"
      >
        <div className={styles.tableAccionButtons} data-col-title="Accion">
          <button
            type="submit"
            onClick={handleEditSubmit}
            className={styles.tableAccion__update}
          >
            {accion === 'ADD' ? <FaPlus /> : <FaCheck />}
          </button>
          <button
            type="submit"
            onClick={handleCancel}
            className={styles.tableAccion__delete}
          >
            <FaBan />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ExchangeRateRowUpdate;
