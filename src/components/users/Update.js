import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { countries } from './typesCont';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatPhoneNumber } from '../../utils/regExp';

import UserFinder from '../../apis/UsersFinder';
import locationsFinder from '../../apis/locationsFinder';
import { useAuth } from '../../context/auth';

import { Validation as schema } from './userValidation';
import styles from './userUpdate.module.scss';

export const UserUpdate = () => {
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [paisInicial, setPaisInicial] = useState(currentUser.country);
  const [estadoInicial, setEstadoInicial] = useState(currentUser.state);
  const [ciudadInicial, setCiudadInicial] = useState(currentUser.city);

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

  const updateData = async (valores) => {
    try {
      const response = await UserFinder.update(currentUser.cod_clie, valores);
      if (response.message === 'ok') {
        toast.success('Actualización Exitosa', {
          duration: 5000,
          position: 'bottom-center',
        });
      } else {
        console.log(response.message);
        toast.error('Error en la actualización', {
          duration: 5000,
          position: 'bottom-center',
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: client,
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (value.country !== paisInicial) {
        fetchStates(value.country);
        setPaisInicial(value.country);
        setEstadoInicial(-1);
        setCiudadInicial(-1);
      } else {
        if (value.state !== estadoInicial) {
          setEstadoInicial(value.state);
          fetchCities(value.country, value.state);
          setCiudadInicial(-1);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, paisInicial, estadoInicial]);

  useEffect(() => {
    const fetchData = async () => {
      reset({
        country: paisInicial,
        state: estadoInicial,
        city: ciudadInicial,
      });
    };

    fetchData();
  }, [reset, paisInicial, estadoInicial, ciudadInicial]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchStates(currentUser.country);
      await fetchCities(currentUser.country, currentUser.state);
      setClient(currentUser);
      setIsLoading(false);
      reset({ ...currentUser });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (valores) => {
    valores.isUpdated = true;
    updateData(valores);
  };

  return (
    <section className={styles.containerForm}>
      <h1 className={styles.title}>Actualizacion de Datos</h1>
      {isLoading && <p> Buscando los datos del cliente .....</p>}
      {!isLoading && client && (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup} data-group-name="Datos Básicos">
            <div className={styles.formField}>
              <label htmlFor="cod_clie">Código</label>
              <input {...register('cod_clie')} disabled />
              <p className={styles.error}>{errors?.cod_clie?.message}</p>
            </div>

            <div className={styles.formField}>
              <label htmlFor="identification">RIF / CI</label>
              <input {...register('identification')} />
              <p className={styles.error}>{errors?.identification?.message}</p>
            </div>

            <div className={`${styles.formField} ${styles.longTxt}`}>
              <label htmlFor="name">Nombre / Descripción</label>
              <input {...register('name')} />
              <p className={styles.error}>{errors.name?.message}</p>
            </div>

            <div className={`${styles.formField} ${styles.longTxt}`}>
              <label htmlFor="represent_name">Representante</label>
              <input {...register('represent_name')} />
              <p className={styles.error}>{errors.represent_name?.message}</p>
            </div>
          </div>

          <div className={styles.formGroup} data-group-name="Datos Contacto">
            <div className={`${styles.formField} ${styles.longTxt}`}>
              <label htmlFor="email">Email</label>
              <input {...register('email')} />
              <p className={styles.error}>{errors.email?.message}</p>
            </div>

            <div className={styles.formField}>
              <label htmlFor="phone1">Teléfono 1</label>
              <input
                {...register('phone1')}
                placeholder="Ej. (212) 123-4567"
                onChange={(event) => {
                  const { value } = event.target;
                  event.target.value = formatPhoneNumber(value);
                }}
              />
              <p className={styles.error}>{errors.phone1?.message}</p>
            </div>

            <div className={styles.formField}>
              <label htmlFor="phone2">Teléfono 2</label>
              <input
                {...register('phone2')}
                placeholder="Ej. (412) 123-4567"
                onChange={(event) => {
                  const { value } = event.target;
                  event.target.value = formatPhoneNumber(value);
                }}
              />
              <p className={styles.error}>{errors.phone2?.message}</p>
            </div>
            <div className={styles.formField}>
              <label htmlFor="phone3">Teléfono 3</label>
              <input
                {...register('phone3')}
                placeholder="Ej. (416) 123-4567"
                onChange={(event) => {
                  const { value } = event.target;
                  event.target.value = formatPhoneNumber(value);
                }}
              />
              <p className={styles.error}>{errors.phone3?.message}</p>
            </div>

            <div className={`${styles.formField} ${styles.longTxt}`}>
              <label htmlFor="address">Dirección</label>
              <input {...register('address')} />
              <p className={styles.error}>{errors.address?.message}</p>
            </div>

            <div className={styles.formField}>
              <label htmlFor="country">Pais</label>
              <select {...register('country')}>
                {countries.map((pais) => {
                  return (
                    <option key={pais.pais_id} value={pais.pais_id}>
                      {pais.name}
                    </option>
                  );
                })}
              </select>
              <p className={styles.error}>{errors.country?.message}</p>
            </div>

            <div className={styles.formField}>
              <label htmlFor="state">Estado</label>
              <select {...register('state')}>
                {states.map((estado) => {
                  return (
                    <option key={estado.estado_id} value={estado.estado_id}>
                      {estado.estado_name}
                    </option>
                  );
                })}
              </select>
              <p className={styles.error}>{errors.state?.message}</p>
            </div>

            <div className={styles.formField}>
              <label htmlFor="city">Ciudad</label>
              <select {...register('city')}>
                {cities.map((ciudad) => {
                  return (
                    <option key={ciudad.ciudad_id} value={ciudad.ciudad_id}>
                      {ciudad.ciudad_name}
                    </option>
                  );
                })}
              </select>
              <p className={styles.error}>{errors.city?.message}</p>
            </div>

            <div className={styles.formField}>
              <label htmlFor="municipality">Municipio</label>
              <input {...register('municipality')} />
              <p className={styles.error}>{errors.municipality?.message}</p>
            </div>

            <div className={styles.formField}>
              <label htmlFor="zip_code">Codigo Postal</label>
              <input {...register('zip_code')} />
              <p className={styles.error}>{errors.zip_code?.message}</p>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button type="submit">Actualizar</button>
            <Toaster />
            <button
              type="button"
              onClick={() => {
                toast.error('Actualización Cancelada', {
                  duration: 5000,
                  position: 'bottom-center',
                });

                navigate('/invoice');
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </section>
  );
};
