import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import toast, { Toaster } from 'react-hot-toast';
import { userValidation as schema } from './userValidation';
import {
  ContainerForm,
  FormField,
  FormGroup,
  RowBottons,
  Title,
} from './User.Style';
import { countries } from '../../data/typesCont';

import locationsFinder from '../../apis/locationsFinder';
// import { AuthContext } from "../../hooks/contexts/AuthContext";

import { formatPhoneNumber } from '../../utils/regExp';
import { useEffect, useState } from 'react';

const CreateUser = () => {
  // const { currentUser } = useContext(AuthContext);
  // const [client, setClient] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [paisInicial, setPaisInicial] = useState(1);
  const [estadoInicial, setEstadoInicial] = useState(0);
  const [ciudadInicial, setCiudadInicial] = useState(0);
  const [municipioInicial, setMunicipioInicial] = useState(0);

  const fetchStates = async (country) => {
    try {
      const response = await locationsFinder.allStates(country);
      setStates(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCities = async (country, state) => {
    try {
      const response = await locationsFinder.allCities(country, state);
      setCities(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMunicipalities = async (country, state, city) => {
    try {
      const response = await locationsFinder.allMunicipalities(
        country,
        state,
        city
      );
      setMunicipalities(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (value.country !== paisInicial) {
        fetchStates(value.country);
        setPaisInicial(value.country);
        setEstadoInicial(-1);
        setCiudadInicial(-1);
        setMunicipioInicial(-1);
      } else {
        if (value.state !== estadoInicial) {
          setEstadoInicial(value.state);
          fetchCities(value.country, value.state);
          setCiudadInicial(-1);
          setMunicipioInicial(-1);
        } else {
          if (value.city !== ciudadInicial) {
            setCiudadInicial(value.city);
            fetchMunicipalities(value.country, value.state, value.city);
            setMunicipioInicial(-1);
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, paisInicial, estadoInicial, ciudadInicial, municipioInicial]);

  useEffect(() => {
    const fetchData = async () => {
      reset({
        country: paisInicial,
        state: estadoInicial,
        city: ciudadInicial,
        minicipality: municipioInicial,
      });
    };

    fetchData();
  }, [reset, paisInicial, estadoInicial, ciudadInicial, municipioInicial]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     await fetchStates(currentUser.country);
  //     await fetchCities(currentUser.country, currentUser.state);
  //     await fetchMunicipalities(
  //       currentUser.country,
  //       currentUser.state,
  //       currentUser.municipality
  //     );
  //     setClient(currentUser);
  //     setIsLoading(false);
  //   };
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const onSubmit = (values) => {
    console.log(values);
    toast.success('Cliente registrado exitosamente', {
      duration: 5000,
      position: 'bottom-center',
    });
  };

  return (
    <ContainerForm>
      <Title>Creación de Clientes</Title>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup data-group-name="Datos Básicos">
          <FormField>
            <label htmlFor="cod_clie" className="form__label">
              Código
            </label>
            <input {...register('cod_clie')} />
            <p className="error">{errors?.cod_clie?.message}</p>
          </FormField>

          <FormField>
            <label htmlFor="identification" className="form__label">
              RIF / CI
            </label>
            <input {...register('identification')} />
            <p className="error">{errors?.identification?.message}</p>
          </FormField>

          <FormField className="long-txt">
            <label htmlFor="name" className="form__label">
              Nombre / Descripción
            </label>
            <input {...register('name')} />
            <p className="error">{errors.name?.message}</p>
          </FormField>

          <FormField className="long-txt">
            <label htmlFor="represent_name" className="form__label">
              Representante
            </label>
            <input {...register('represent_name')} />
            <p className="error">{errors.represent_name?.message}</p>
          </FormField>
        </FormGroup>

        <FormGroup data-group-name="Datos Contacto">
          <FormField className="long-txt">
            <label htmlFor="email" className="form__label">
              Email
            </label>
            <input {...register('email')} />
            <p className="error">{errors.email?.message}</p>
          </FormField>

          <FormField>
            <label htmlFor="phone1" className="form__label">
              Teléfono 1
            </label>
            <input
              {...register('phone1')}
              placeholder="Ej. (212) 123-4567"
              onChange={(event) => {
                const { value } = event.target;
                event.target.value = formatPhoneNumber(value);
              }}
            />
            <p className="error">{errors.phone1?.message}</p>
          </FormField>

          <FormField>
            <label htmlFor="phone2" className="form__label">
              Teléfono 2
            </label>
            <input
              {...register('phone2')}
              placeholder="Ej. (412) 123-4567"
              onChange={(event) => {
                const { value } = event.target;
                event.target.value = formatPhoneNumber(value);
              }}
            />
            <p className="error">{errors.phone2?.message}</p>
          </FormField>

          <FormField>
            <label htmlFor="phone3" className="form__label">
              Teléfono 3
            </label>
            <input
              {...register('phone3')}
              placeholder="Ej. (416) 123-4567"
              onChange={(event) => {
                const { value } = event.target;
                event.target.value = formatPhoneNumber(value);
              }}
            />
            <p className="error">{errors.phone3?.message}</p>
          </FormField>

          <FormField className="long-txt">
            <label htmlFor="address" className="form__label">
              Dirección
            </label>
            <input {...register('address')} />
            <p className="error">{errors.address?.message}</p>
          </FormField>

          <FormField>
            <label htmlFor="county" className="form__label">
              Pais{'        '}
            </label>
            <select {...register('country')}>
              {countries.map((pais) => {
                return (
                  <option key={pais.pais_id} value={pais.pais_id}>
                    {pais.name}
                  </option>
                );
              })}
            </select>
            <p className="error">{errors.country?.message}</p>
          </FormField>

          <FormField>
            <label htmlFor="state" className="form__label">
              Estado
            </label>
            <select {...register('state')}>
              {states.map((estado) => {
                return (
                  <option key={estado.estado_id} value={estado.estado_id}>
                    {estado.estado_name}
                  </option>
                );
              })}
            </select>
            <p className="error">{errors.state?.message}</p>
          </FormField>

          <FormField>
            <label htmlFor="city" className="form__label">
              Ciudad
            </label>
            <select {...register('city')}>
              {cities.map((ciudad) => {
                return (
                  <option key={ciudad.ciudad_id} value={ciudad.ciudad_id}>
                    {ciudad.ciudad_name}
                  </option>
                );
              })}
            </select>
            <p className="error">{errors.city?.message}</p>
          </FormField>

          <FormField>
            <label htmlFor="municipality" className="form__label">
              Municipio
            </label>
            <select {...register('municipality')}>
              {municipalities.map((municipio) => {
                return (
                  <option
                    key={municipio.municipio_id}
                    value={municipio.municipio_id}
                  >
                    {municipio.municipio_name}
                  </option>
                );
              })}
            </select>

            <p className="error">{errors.municipality?.message}</p>
          </FormField>

          <FormField>
            <label htmlFor="zip_code" className="form__label">
              Codigo Postal
            </label>
            <input {...register('zip_code')} />
            <p className="error">{errors.zip_code?.message}</p>
          </FormField>
        </FormGroup>

        <RowBottons>
          <button type="submit">Crear Cliente</button>
          <Toaster />
        </RowBottons>
      </form>
    </ContainerForm>
  );
};

export default CreateUser;
