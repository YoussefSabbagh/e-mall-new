import { useState } from 'react';
import { useAuth } from '../../../context/auth';

import { DepositMethod } from './DepositMethod';
import { MovilMethod } from './MovilMethod';
// import ZellePayment from '../../components/Payments/ZellePayments';

import { FormatDecimal } from '../../../utils/formats';

import styles from './invoicesPayMethod.module.scss';

export const InvoicesPayMethod = ({ amountToPay, exchangeRate }) => {
  const { invoices } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [showModal, setShowModal] = useState(false);
  const [payments, setPayments] = useState({
    method: 'Transfer',
    amount_USD: 0,
    amount_Bs: 0,
  });

  const invoicesToPay = invoices.filter(
    (invoice) => invoice.invoice_status === 1
  );

  const handlePagarPayPal = async () => {
    // e.preventDefault();
    alert(`Se va a pagar con PayPal`);
    // await InvoicesFinder.paymentsPayPal(1, currentUser, amountToPay);
    // setCurrentUser((user) => {
    //   return { ...user, payment_amount: amountToPay };
    // });
  };

  const handleOnChange = (e) => {
    setPaymentMethod(e.target.value);
    switch (e.target.value) {
      case 'PayPal':
        setPayments({
          method: 'PayPal',
          amount_USD: (amountToPay.Deuda * 1.02).toFixed(2),
          amount_Bs: (amountToPay.Deuda * 1.02).toFixed(2),
        });

        handlePagarPayPal();
        break;

      case 'transfer':
        setShowModal(true);
        e.target.checked = false;
        setPayments({
          method: 'transfer',
          amount_USD: 0,
          amount_Bs: (amountToPay.Deuda * 1.02).toFixed(2),
        });
        break;

      case 'zelle':
        setPayments({
          method: 'zelle',
          amount_USD: (amountToPay.Deuda * 1.02).toFixed(2),
          amount_Bs: (amountToPay.Deuda * 1.02).toFixed(2),
        });
        break;

      case 'pago-movil':
        setShowModal(true);
        setPayments({
          goToPay: true,
          method: 'pago-movil',
          amount_USD: 0,
          amount_Bs: (amountToPay.Deuda * 1.02).toFixed(2),
        });
        break;

      default:
        break;
    }
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.paySummary}>
          <div>
            <span className={styles.firstColumn}>Concepto </span>
            <span>Monto US$</span>
            <span>Monto Bs.</span>
            <span>Saldo Bs.</span>
          </div>

          <div>
            <span className={styles.firstColumn}>Subtotal :</span>
            <span>
              {FormatDecimal(amountToPay.MontoUSD + amountToPay.IvaUSD)}
            </span>
            <span>
              {FormatDecimal(amountToPay.IvaBs + amountToPay.MontoBs)}
            </span>
            <span>{FormatDecimal(amountToPay.Deuda)}</span>
          </div>

          <div>
            <span className={styles.firstColumn}>Taq.Virtual 2%:</span>
            <span>
              {FormatDecimal(
                (amountToPay.MontoUSD + amountToPay.IvaUSD) * 0.02
              )}
            </span>
            <span>
              {FormatDecimal((amountToPay.IvaBs + amountToPay.MontoBs) * 0.02)}
            </span>
            <span>{FormatDecimal(amountToPay.Deuda * 0.02)}</span>
          </div>

          <div>
            <span className={styles.firstColumn}>Total :</span>
            <span>
              {FormatDecimal(
                (amountToPay.MontoUSD + amountToPay.IvaUSD) * 1.02
              )}
            </span>
            <span>
              {FormatDecimal((amountToPay.IvaBs + amountToPay.MontoBs) * 1.02)}
            </span>
            <span>{FormatDecimal(amountToPay.Deuda * 1.02)}</span>
          </div>
        </div>

        <form className={styles.payButtonForm}>
          <h2> Metodo de Pago</h2>
          <div>
            <div>
              <div className={styles.radioButton}>
                <input
                  type="radio"
                  id="paypal"
                  value="PayPal"
                  name="payment-method"
                  required
                  onChange={(e) => handleOnChange(e)}
                />
                <label htmlFor="paypal">PayPal</label>
              </div>
            </div>

            <div>
              <div className={styles.radioButton}>
                <input
                  type="radio"
                  id="transfer"
                  value="transfer"
                  name="payment-method"
                  required
                  onChange={(e) => handleOnChange(e)}
                />
                <label htmlFor="transfer">Transferencia</label>
              </div>
            </div>

            <div>
              <div className={styles.radioButton}>
                <input
                  type="radio"
                  id="zelle"
                  value="zelle"
                  name="payment-method"
                  required
                  onChange={(e) => handleOnChange(e)}
                />
                <label htmlFor="zelle">Zelle</label>
              </div>
            </div>

            <div>
              <div className={styles.radioButton}>
                <input
                  type="radio"
                  id="pago-movil"
                  value="pago-movil"
                  name="payment-method"
                  required
                  onChange={(e) => handleOnChange(e)}
                />
                <label htmlFor="pago-movil">Pago movil</label>
              </div>
            </div>
          </div>
        </form>
      </section>

      <div className="pago-container">
        {showModal && payments.method === 'transfer' && (
          <DepositMethod
            invoicesToPay={invoicesToPay}
            amount={payments.amount_Bs}
            show={setShowModal}
          />
        )}
        {showModal && payments.method === 'pago-movil' && (
          <MovilMethod
            invoicesToPay={invoicesToPay}
            amount={payments.amount_Bs}
            show={setShowModal}
          />
        )}
        {/* {payments.method === 'zelle' && (
          <ZellePayment
            invoicesToPay={invoicesToPay}
            amount={payments.payment_amount_USD}
          />
        )} */}
      </div>
    </>
  );
};
