import { useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { bankData } from '../../../apis/bankData';

import InvoicesFinder from '../../../apis/invoicesFinder';
import styles from './movilMethod.module.scss';

export const MovilMethod = ({ invoicesToPay, amount, show }) => {
  const [isActButton, setIsActButton] = useState(true);

  const intialValues = {
    cod_from: '',
    phone_from: '',
    bank_from: '',
    cod_to: '',
    phone_to: '',
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
        <h2 className={styles.title}>Datos del Pago Movil</h2>

        <div className={styles.formGroup}>
          <h2 className={styles.subtitle}> Nuestros Datos</h2>

          <div className={styles.main_txt}>
            <p>Teléfono : 424-1234567</p>
            <p>Banco Mercantil</p>
            <p>RIF: J-12345678</p>
            <p>
              Monto a cancelar : <span> {amount} </span>
            </p>
          </div>
        </div>

        <div className={styles.formGroup}>
          <h2 className={styles.subtitle}> Datos del Cuentahabiente</h2>
          <div className={styles.formField}>
            <label htmlFor="cod_from">Cédula / Rif:</label>
            <input
              {...register('cod_from', {
                required: { value: true, message: 'CI o Rif obligatorio ' },
              })}
            />
            <p className={styles.error}>{errors?.cod_from?.message}</p>
          </div>

          <div className={styles.formField}>
            <label htmlFor="phone_from">Teléfono:</label>
            <input
              {...register('phone_from', {
                required: { value: true, message: 'Debe indicar el teléfono ' },
              })}
            />
            <p className={styles.error}>{errors?.phone_from?.message}</p>
          </div>

          <div className={styles.formField}>
            <label className="form__label">Banco Cliente:</label>
            <select
              {...register('bank_from', {
                required: {
                  value: true,
                  message: 'Debe indicar banco desde donde hizo el pago movil',
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
            <p className={styles.error}>{errors.bank_from?.message}</p>
          </div>

          <div className={styles.formField}>
            <label className="form__label">Referencia </label>
            <input
              {...register('reference', {
                required: {
                  value: true,
                  message: 'Debe indicar el numero o referencia del pago movil',
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
            <p className={styles.error}> {errors.reference?.message}</p>
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
            <p className={styles.error}>{errors.date?.message}</p>
          </div>
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
