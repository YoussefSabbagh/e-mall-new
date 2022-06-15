import { useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
// import { yupResolver } from "@hookform/resolvers/yup";
import { bankData, bankData2 } from '../../../apis/bankData';

import InvoicesFinder from '../../../apis/invoicesFinder';
import styles from './depositMethod.module.scss';
// import { DepositSchema as schema } from "./DepositValidation";

export const DepositMethod = ({ invoicesToPay, amount, show }) => {
  const [isActButton, setIsActButton] = useState(true);

  const intialValues = {
    bank_from: '',
    bank_to: '',
    date: '',
    reference: '',
    amount: amount,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: intialValues,
    mode: 'all',
  });

  const RegisterTransfer = async (reference, invoicesToPay) => {
    try {
      const response = await InvoicesFinder.transfer(
        invoicesToPay,
        reference,
        'transfer'
      );

      if (response.success) {
        toast.success('Pago registrado exitosamente', {
          duration: 5000,
          position: 'bottom-center',
        });
        setIsActButton(false);
      } else {
        alert('error' + response.message);
        console.log('error', response.message);
      }
    } catch (err) {}
  };

  const onSubmit = (valores) => {
    setIsActButton(false);
    RegisterTransfer(valores, invoicesToPay, amount);
  };

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>
          Introduzca los datos de la transferencia
        </h2>
        <div className={styles.formField}>
          <label className="form__label">Banco Origen :</label>
          <select
            {...register('bank_from', {
              required: {
                value: true,
                message: 'Debe indicar banco desde donde hizo la transferencia',
              },
            })}
          >
            {bankData.map((bank) => {
              return (
                <option key={bank.codigo} value={bank.codigo}>
                  {bank.nombre}
                </option>
              );
            })}
          </select>
          <p className="error">{errors.bank_from?.message}</p>
        </div>

        <div className={styles.formField}>
          <label className="form__label">Banco Destino :</label>
          <select
            {...register('bank_to', {
              required: {
                value: true,
                message: 'Debe indicar banco a donde hizo la transferencia',
              },
            })}
          >
            {bankData2.map((bank) => {
              return (
                <option key={bank.codigo} value={bank.codigo}>
                  {bank.nombre}
                </option>
              );
            })}
          </select>
          <p className="error">{errors.bank_to?.message}</p>
        </div>

        <div className={styles.formField}>
          <label className="form__label">Referencia </label>
          <input
            {...register('reference', {
              required: {
                value: true,
                message:
                  'Debe indicar el numero o referencia de la transferencia o deposito',
              },
              minLength: {
                value: 6,
                message: 'debe indicar al menos los ultimos 6 digitos',
              },
              maxLength: {
                value: 10,
                message: 'Maximo 10 digitos',
              },
            })}
          />
          <p className="error">{errors.reference?.message}</p>
        </div>

        <div className={styles.formField}>
          <label className="form__label">Fecha </label>
          <input
            type="date"
            {...register('date', {
              required: {
                value: true,
                message: 'Debe indicar la fecha la transferencia',
              },
            })}
          />
          <p className="error">{errors.date?.message}</p>
        </div>

        <div className={styles.formField}>
          <label className="form__label">Monto </label>
          <input
            {...register('amount', {
              required: {
                value: true,
                message: 'Debe indicar el monto de la transferencia',
              },
              min: {
                value: 1,
                message: `el monto debe ser mayor a 1`,
              },
              max: {
                value: amount,
                message: `el monto maximo no puede mayor a ${amount}`,
              },
            })}
          />
          <p className="error">{errors.amount?.message}</p>
        </div>

        <div className={styles.buttonContainer}>
          {isValid && isActButton && <button type="submit">Enviar</button>}
          <Toaster />
          <button type="button" onClick={() => show(false)}>
            Regresar
          </button>
        </div>
      </form>
    </section>
  );
};
