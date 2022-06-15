import styles from './ExchangeRate.module.scss';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { FormatDate } from '../../utils/formats';
const ExchangeRateRowRO = ({ exchangeRate, handleUpdate, handleDelete }) => {
  return (
    <tr className={styles.tableRow}>
      <td className={styles.tableCell} data-col-title="Id">
        {exchangeRate._id}
      </td>
      <td className={styles.tableCell} data-col-title="Fecha">
        {FormatDate(exchangeRate.date)}
      </td>

      <td className={styles.tableCell} data-col-title="Tasa">
        {exchangeRate.rate}
      </td>
      <td
        className={`${styles.tableCell} ${styles.tableAccion} `}
        data-col-title="Accion"
      >
        <div className={styles.tableAccionButtons} data-col-title="Accion">
          <button
            className={styles.tableAccion__update}
            type="button"
            onClick={(e) => handleUpdate(e, exchangeRate)}
          >
            <FaPencilAlt />
          </button>
          <button
            className={styles.tableAccion__delete}
            type="button"
            onClick={() => handleDelete(exchangeRate._id)}
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ExchangeRateRowRO;
