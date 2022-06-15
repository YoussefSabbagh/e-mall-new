import * as Yup from 'yup';

export const DepositValidation = (Monto = 50) =>
  Yup.object().shape({
    bank_from: Yup.string().required(
      'Debe indicar banco desde donde hizo la transferencia'
    ),
    bank_to: Yup.string().required(
      'Debe indicar banco a donde hizo la transferencia'
    ),
    reference: Yup.string()
      .min(6, 'Debe tener al menos 6 digitos')
      .max(10, 'Maximo 10 digitos')
      .required('Debe indicar el numero o referencia de la transferencia'),
    date: Yup.date().typeError('fecha invalida').required('Required'),
    amount: Yup.number()
      .max(Monto, `Monto no puede ser superior ${Monto}`)
      .typeError('Monto invalido')
      .required('Requerido'),
  });
