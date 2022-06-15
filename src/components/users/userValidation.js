import * as Yup from 'yup';

/*
 Ver el repositorio para mas valdaciones
https://github.com/vikas62081/YT/tree/advanceFormValidation 
https://www.youtube.com/watch?v=wfogZfIS03U
*/

import { regExp } from '../../utils/regExp';

export const Validation = Yup.object().shape({
  // cod_clie: Yup.string()
  //   .matches(regExp.VesIdent, 'Introduzca una identificación valida')
  //   .required('Requerido'),
  identification: Yup.string()
    .matches(regExp.VesIdent, 'Introduzca una identificación valida')
    .required('Requerido'),
  name: Yup.string()
    .min(3, 'Debe tener más de 3 letras')
    .max(50, 'Muy largo, máximo 50 caracteres')
    .required('Obligatorio'),
  represent_name: Yup.string().max(50, 'Muy largo, máximo 50 caracteres'),
  email: Yup.string()
    .email('Email invalido')
    .typeError('Email invalido')
    .required('Requerido'),
  // phone1: Yup.string().min(10, 'Debe tener 10 digitos')
  //   .matches(regExp.phone, 'Teléfono invalido')
  //   .required('Requerido'),
  // phone2: Yup.string().min(10, 'Debe tener 10 digitos')
  //   .matches(regExp.phone, 'Teléfono invalido')
  //   .required('Requerido'),
  // phone3: Yup.string().min(10, 'Debe tener 10 digitos')
  //   .matches(regExp.phone, 'Teléfono invalido')
  //   .required('Requerido'),
  // password: Yup.string(),
  address: Yup.string()
    .min(3, 'Debe tener más de 3 letras')
    .required('Obligatorio'),
  // zip_code: Yup.string().required("Requerido"),
  //   .min(8, "Debe tener 8 o mas caracters")
  //   .matches(
  //     regExp.password,
  //     "La clave debe tener al menos una mayúscula, una minúscula, un número y un símbolo especial"
  //   )
  //   .required("Required"),
  // passwordConfirm: Yup.string()
  //   .oneOf([Yup.ref("password")], "Las claves no coinciden")
  //   .required("Obligatorio"),
});
