import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './login.module.scss';
import { Schema as schema } from './loginValidation';

import AccessFinder from '../../apis/Access';
import logo from '../../assets/image/logos/emall.png';

export const Login = () => {
  const { setView, setCurrentUser, setAuth, setIsUser, setIsAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isError, setIsError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setView('login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const LoginUser = async (values) => {
    let redirectPath = location.state?.path || '/landing';

    try {
      const data = await AccessFinder.login(values);
      if (data.success) {
        localStorage.setItem('token', data.token);
        setCurrentUser((p) => data.data);
        if (data.data.user_role === 'VI') {
          redirectPath = location.state?.path || '/user';
          setAuth(true);
          setIsUser(true);
          setIsAdmin(false);
          setView('userHome');
        } else {
          redirectPath = location.state?.path || '/admin';
          setIsUser(false);
          setIsAdmin(true);
          setView('adminHome');
        }
        navigate(redirectPath, { replace: true });
      } else {
        setAuth(false);
        setIsError((prev) => data.msg);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const onSubmit = (valores) => {
    valores.isUpdated = true;
    LoginUser(valores);
  };

  return (
    <>
      <section className={styles.section}>
        <article className={styles.card}>
          <div className={styles.msgs}>
            <div className={styles.logo}>
              <img src={logo} alt="emall-logo"></img>
            </div>
            <h1 className={styles.title}>Gracias por volver</h1>
            {isError && <p className={styles.credentialError}>{isError}</p>}
          </div>
          <div className={styles.body}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.form__field}>
                <label htmlFor="identification">Identificación</label>
                <input
                  {...register('identification')}
                  placeholder="Identificación"
                />
                <p className={styles.error}>
                  {errors?.identification?.message}
                </p>
              </div>

              <div className={styles.form__field}>
                <label htmlFor="password">Clave</label>
                <input {...register('password')} placeholder="Clave" />
                <p className={styles.error}>{errors?.password?.message}</p>
              </div>

              <button className={styles.button} type="submit">
                Ingresar
              </button>
            </form>
          </div>
          <p className={styles.muteLink}>
            <Link to="/register" className={styles.boldLink}>
              ¿No tienes una cuenta aun? <span>Registrarse</span>{' '}
            </Link>
          </p>
        </article>
      </section>
    </>
  );
};
