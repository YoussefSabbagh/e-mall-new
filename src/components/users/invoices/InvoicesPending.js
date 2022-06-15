import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/auth';
import invoicesFinder from '../../../apis/invoicesFinder';
import { InvoicesPayMethod } from './InvoicesPayMethod';
import { FormatDecimal, FormatDate } from '../../../utils/formats';
import styles from './invoicesPending.module.scss';
import globalStyles from '../../../smartTable.module.scss';

export const InvoicesPending = () => {
  const { currentUser, invoices, setInvoices } = useAuth();

  const [amountToPay, setAmountToPay] = useState({
    MontoUSD: 0,
    IvaUSD: 0,
    MontoBs: 0,
    IvaBs: 0,
    Deuda: 0,
    Saldo_acum: 0,
  });

  const [totalDebt, setTotalDebt] = useState({
    MontoUSD: 0,
    IvaUSD: 0,
    MontoBs: 0,
    IvaBs: 0,
    Deuda: 0,
    Saldo_acum: 0,
  });

  const [isTotalSelected, setIsTotalSelected] = useState(false);

  const cal_saldo = (invoices) => {
    const rec = [];
    let saldo_acumulado = 0;

    invoices.map((invoice, i) => {
      saldo_acumulado = saldo_acumulado + invoice.Deuda;
      rec.push({ ...invoice, saldo_acumulado });
      return rec;
    });
    return rec;
  };

  const handleCheckBoxAll = (e) => {
    const newAmountToPay = {
      MontoUSD: 0,
      IvaUSD: 0,
      MontoBs: 0,
      IvaBs: 0,
      Deuda: 0,
      Saldo_acum: 0,
    };
    setIsTotalSelected(!isTotalSelected);
    invoices.map((invoice) => {
      if (e.target.checked) {
        invoice.invoice_status = 1;
        newAmountToPay.MontoUSD = newAmountToPay.MontoUSD + invoice.MontoMEx;
        newAmountToPay.MontoBs = newAmountToPay.MontoBs + invoice.Monto;
        newAmountToPay.IvaUSD =
          newAmountToPay.IvaUSD + invoice.MtoTax / invoice.Factor;
        newAmountToPay.IvaBs = newAmountToPay.IvaBs + invoice.MtoTax;
        newAmountToPay.Deuda = newAmountToPay.Deuda + invoice.Deuda;
        newAmountToPay.Saldo_acum =
          newAmountToPay.Saldo_acum + invoice.saldo_acumulado;
      } else {
        invoice.invoice_status = 0;
      }
      setAmountToPay(newAmountToPay);
      return amountToPay;
    });
  };

  const handleCheckBox = (e, id) => {
    const newAmountToPay = {
      MontoUSD: 0,
      IvaUSD: 0,
      MontoBs: 0,
      IvaBs: 0,
      Deuda: 0,
      Saldo_acum: 0,
    };
    setIsTotalSelected(false);
    invoices.map((invoice) => {
      if (id === invoice._id) {
        invoice.invoice_status = e.target.checked ? 1 : 0;
      }

      if (invoice.invoice_status === 1) {
        newAmountToPay.MontoUSD = newAmountToPay.MontoUSD + invoice.MontoMEx;
        newAmountToPay.MontoBs = newAmountToPay.MontoBs + invoice.Monto;
        newAmountToPay.IvaUSD =
          newAmountToPay.IvaUSD + invoice.MtoTax / invoice.Factor;
        newAmountToPay.IvaBs = newAmountToPay.IvaBs + invoice.MtoTax;
        newAmountToPay.Deuda = newAmountToPay.Deuda + invoice.Deuda;
        newAmountToPay.Saldo_acum =
          newAmountToPay.Deuda + invoice.saldo_acumulado;
      }
      setAmountToPay(newAmountToPay);
      return amountToPay;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await invoicesFinder.pending(currentUser.cod_clie);

        const newTotal = {
          MontoUSD: 0,
          IvaUSD: 0,
          MontoBs: 0,
          IvaBs: 0,
          Deuda: 0,
        };

        response.data.invoices.forEach((current) => {
          newTotal.MontoUSD = newTotal.MontoUSD + current.MontoMEx;
          newTotal.IvaUSD = newTotal.IvaUSD + current.MtoTax / current.Factor;
          newTotal.MontoBs = newTotal.MontoBs + current.Monto;
          newTotal.IvaBs = newTotal.IvaBs + current.MtoTax;
          newTotal.Deuda = newTotal.Deuda + current.Deuda;
        });

        setTotalDebt(newTotal);

        setInvoices(cal_saldo(response.data.invoices));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.section}>
      <table className={globalStyles.smartTable}>
        <caption>Recibos Pendientes</caption>
        <thead>
          <tr>
            <th> Numero </th>
            <th> Factura </th>
            <th> Tipo </th>
            <th> F.Emisión </th>
            <th> F.Venc. </th>
            {/* <th> Descripción </th> */}
            <th> Monto US$ </th>
            <th> IVA US$ </th>
            <th> Factor </th>
            <th> Monto Bs. </th>
            <th> IVA Bs. </th>
            <th> Monto Total </th>
            {/* <th> Pagos</th> */}
            <th> Deuda Ped. </th>
            <th> Saldo </th>
            <th> Pagar </th>
          </tr>
        </thead>
        <tbody>
          {invoices &&
            invoices.length > 0 &&
            invoices.map((invoice, i) => {
              return (
                <tr key={invoice._id}>
                  <td data-col-title="Numero"> {i + 1} </td>
                  <td data-col-title="Factura"> {invoice.NumeroD} </td>
                  <td data-col-title="Tipo"> {invoice.TipoFac} </td>
                  <td data-col-title="F. Emisión">
                    {FormatDate(invoice.FechaI)}
                  </td>
                  <td data-col-title="F. Venc.">
                    {FormatDate(invoice.FechaV)}
                  </td>
                  {/* <td data-col-title="Descripcion">{invoice.Descrip}</td> */}
                  <td data-col-title="Monto US$">
                    {FormatDecimal(invoice.MontoMEx)}
                  </td>
                  <td data-col-title="IVA US$">
                    {FormatDecimal(invoice.MtoTax / invoice.Factor)}
                  </td>
                  <td data-col-title="Factor">
                    {FormatDecimal(invoice.Factor)}
                  </td>
                  <td data-col-title="Monto Bs.">
                    {FormatDecimal(invoice.Monto)}
                  </td>
                  <td data-col-title="IVA Bs.">
                    {FormatDecimal(invoice.MtoTax)}
                  </td>
                  <td data-col-title="Monto Total">
                    {FormatDecimal(invoice.MtoTotal)}
                  </td>
                  <td data-col-title="Deuda">{FormatDecimal(invoice.Deuda)}</td>
                  {/* <td data-col-title="Pagos">
                    {FormatDecimal(invoice.MtoTotal - invoice.Deuda)}
                  </td> */}
                  <td data-col-title="Saldo">
                    {FormatDecimal(invoice.saldo_acumulado)}
                  </td>
                  <td data-col-title="Pagar">
                    <input
                      type="checkbox"
                      checked={invoice.invoice_status === 1}
                      name={'check' + invoice._id}
                      id={'check' + invoice._id}
                      onChange={(e) => handleCheckBox(e, invoice._id)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5" className="first-cell">
              Deuda Total
            </td>
            <td data-col-title="Monto US$">
              {FormatDecimal(totalDebt.MontoUSD)}
            </td>
            <td data-col-title="IVA US$">{FormatDecimal(totalDebt.IvaUSD)}</td>
            <td data-col-title="Factor">{'-'}</td>
            <td data-col-title="Monto Bs.">
              {FormatDecimal(totalDebt.MontoBs)}
            </td>
            <td data-col-title="IVA Bs.">{FormatDecimal(totalDebt.IvaBs)}</td>
            <td data-col-title="Monto Total">
              {FormatDecimal(totalDebt.MontoBs + totalDebt.IvaBs)}
            </td>
            <td data-col-title="Deuda Total">
              {FormatDecimal(totalDebt.Deuda)}
            </td>
            <td data-col-title="-">{'-'}</td>
            <td data-col-title="Pagar todos">
              <input
                type="checkbox"
                name={'check-total'}
                id={'check-total'}
                checked={isTotalSelected}
                onChange={(e) => handleCheckBoxAll(e)}
              />
            </td>
          </tr>
        </tfoot>
      </table>
      {amountToPay.MontoBs > 0 && (
        <InvoicesPayMethod amountToPay={amountToPay} />
      )}
    </section>
  );
};
