import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/auth';
import invoicesFinder from '../../../apis/invoicesFinder';

import { FormatDecimal, FormatDate } from '../../../utils/formats';
import globalStyles from '../../../smartTable.module.scss';
import styles from './balanceStatement.module.scss';

export const UserBalanceStatement = () => {
  const { currentUser, invoicesAll, setInvoicesAll } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  const cal_balance = (invoices) => {
    const rec = [];
    let balance = 0;

    invoices.map((invoice, i) => {
      if (invoice.TipoCxc < 40) {
        balance = balance + invoice.Monto;
      } else {
        balance = balance - invoice.Monto;
      }
      rec.push({ ...invoice, balance });
      return rec;
    });
    return rec;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await invoicesFinder.all(currentUser.cod_clie);
        setInvoicesAll(cal_balance(response.data.invoices));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.section}>
      {isLoading && <h1> Buscando Estado de cuenta .....</h1>}
      {!isLoading && (
        <table className={globalStyles.smartTable}>
          <thead>
            <tr>
              <th> Nro </th>
              <th> Factura </th>
              <th> Nro Control </th>
              <th> F. Emisión</th>
              <th> Documento </th>
              <th> NumeroD </th>
              <th> NumeroN </th>
              <th> Monto Total </th>
              <th> Debitos </th>
              <th> Creditos </th>
              <th> Saldo</th>
            </tr>
          </thead>
          <tbody>
            {invoicesAll &&
              invoicesAll.length > 0 &&
              invoicesAll.map((invoice, i) => {
                return (
                  <tr
                    // onClick={() => handleInvoicetSelect(invoice.invoice_id)}
                    key={invoice.invoice_id}
                  >
                    <td data-col-title="Nro"> {i + 1} </td>
                    <td data-col-title="Factura"> {invoice.NumeroD} </td>
                    <td data-col-title="Nro. Control"> {invoice.NroCtrol} </td>
                    <td data-col-title="F.Emisión">
                      {invoice.FechaI ? FormatDate(invoice.FechaI) : '-'}
                    </td>

                    <td data-col-title="Descripcion">{invoice.Document}</td>
                    <td data-col-title="NumeroD">{invoice.NumeroD}</td>
                    <td data-col-title="NumeroN">{invoice.NumeroN}</td>
                    <td data-col-title="Monto">
                      {FormatDecimal(invoice.Monto)}
                    </td>
                    <td data-col-title="Debito">
                      {invoice.TipoCxc < 40
                        ? FormatDecimal(invoice.Monto)
                        : '-'}
                    </td>
                    <td data-col-title="Credito">
                      {invoice.TipoCxc > 40
                        ? FormatDecimal(invoice.Monto)
                        : '-'}
                    </td>
                    <td data-col-title="Saldo">
                      {FormatDecimal(invoice.balance)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </section>
  );
};
