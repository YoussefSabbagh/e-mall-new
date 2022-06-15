import { Link } from 'react-router-dom';
import styles from './footer.module.scss';
import logo from '../../assets/image/logos/saint_logo.png';

import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

export const Footer = ({ id = 'footer' }) => {
  return (
    <footer className={styles.footer} id={id}>
      <div className={styles.footer__wrapper} id={id}>
        <Link to="/">
          <div className={styles.footer__logo}>
            <img src={logo} alt="Logo Saint" />
          </div>
        </Link>

        <div className={styles.footer__rights}>
          © 2022 - Desarrollado por Taguara Digital. Todos los derechos
          reservados
        </div>

        <div className={styles.footer__social}>
          <a
            className={styles.footer__socialIcon}
            href="https://www.facebook.com/SaintdeVenezuela/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            className={styles.footer__socialIcon}
            href="https://www.instagram.com/saintve/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            className={styles.footer__socialIcon}
            href="https://twitter.com/saintve"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};
