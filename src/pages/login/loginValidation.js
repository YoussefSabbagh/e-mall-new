import * as Yup from 'yup';

/*
 Ver el repositorio para mas valdaciones
https://github.com/vikas62081/YT/tree/advanceFormValidation 
https://www.youtube.com/watch?v=wfogZfIS03U
*/

import { regExp } from '../../utils/regExp';

export const Schema = Yup.object().shape({
  identification: Yup.string()
    .matches(regExp.VesIdent, 'Introduzca una identificación valida')
    .required('Requerido'),
  password: Yup.string()
    .min(3, 'Debe tener más de 3 letras')
    .required('Required'),
});
