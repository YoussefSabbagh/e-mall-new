import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import InvoicesFinder from '../../apis/invoicesFinder';
import { FormatDecimal, FormatDate } from '../../utils/formats';

import styles from './invoicesToConfirm.module.scss';
import globalStyles from '../../smartTable.module.scss';

export const PaymentsList = () => {
  const { checkAuthenticated, invoices, setInvoices } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthenticated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await InvoicesFinder.paymentsConfirm();
        setInvoices(response.data.invoices);
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
      {isLoading && <h1> Buscando datos .....</h1>}
      {!isLoading && (
        <table className={globalStyles.smartTable}>
          <caption>Recibos pagos confirmados</caption>
          <thead>
            <tr>
              <th> Numero </th>
              <th> Cliente </th>
              <th> Factura </th>
              <th> F. Emisión </th>
              <th> Monto </th>
              <th> Saldo </th>
              <th> Descripción </th>
              <th> Monto Bs. </th>
              <th> Taq. Vir Bs. </th>
              <th> Total Bs. </th>
              <th> Fecha Pago </th>
              <th> Metodo </th>
            </tr>
          </thead>
          <tbody>
            {invoices &&
              invoices.length > 0 &&
              invoices.map((invoice, i) => {
                return (
                  <tr key={invoice._id}>
                    <td data-col-title="Numero"> {i + 1} </td>
                    <td data-col-title="Cliente"> {invoice.CodClie} </td>
                    <td data-col-title="Factura">{invoice.NumeroN}</td>
                    <td data-col-title="F. Emisión">
                      {FormatDate(invoice.FechaI)}
                    </td>

                    <td data-col-title="Monto">
                      {FormatDecimal(invoice.MontoNeto)}
                    </td>
                    <td data-col-title="Saldo">
                      {FormatDecimal(invoice.Saldo)}
                    </td>
                    <td data-col-title="Descripción">{invoice.description}</td>
                    <td data-col-title="Monto Bs.">
                      {FormatDecimal(invoice.MontoBs)}
                    </td>
                    <td data-col-title="Taq. Vit. Bs.">
                      {FormatDecimal(invoice.MtoTaqVirBs)}
                    </td>
                    <td data-col-title="Total Bs.">
                      {FormatDecimal(invoice.MtoTotalBs)}
                    </td>
                    <td data-col-title="Fecha Pago">
                      {FormatDate(invoice.payment_date)}
                    </td>
                    <td data-col-title="Metodo">{invoice.payment_method}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </section>
  );
};
