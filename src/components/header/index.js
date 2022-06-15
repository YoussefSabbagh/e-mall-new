import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Link as Links } from 'react-scroll';

import { FaBars, FaTimes } from 'react-icons/fa';
import { headerData as data } from './data';
import { useAuth } from '../../context/auth';
import logo from '../../assets/image/logos/saint_logo.png';
import styles from './header.module.scss';

export const Header = () => {
  const { view } = useAuth();
  const [showMobileMenu, SetShowMobileMenu] = useState(false);

  const handleShowToggleMenu = () => {
    SetShowMobileMenu(!showMobileMenu);
  };

  let routersPage = data.landing;

  switch (view) {
    case 'landing':
      routersPage = data.landing;
      break;

    case 'login':
      routersPage = data.login;
      break;

    case 'adminHome':
      routersPage = data.adminHome;
      break;

    case 'userHome':
      routersPage = data.userHome;
      break;

    default:
      break;
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
        </div>

        <div className={styles.center}>
          <ul
            className={
              showMobileMenu
                ? `${styles.navLinks} ${styles.show}`
                : `${styles.navLinks}`
            }
          >
            {routersPage.map((link) => {
              return link.cName === 'scroll' ? (
                // scroll in same page
                <li key={link.id}>
                  <Links to={link.path} onClick={handleShowToggleMenu}>
                    {link.title}
                  </Links>
                </li>
              ) : link.cName === 'single' ? (
                // Single Link
                <li key={link.id}>
                  <NavLink to={link.path} onClick={handleShowToggleMenu}>
                    {link.title}
                  </NavLink>
                </li>
              ) : // Dropdown Link

              link.cName === 'dropdown' ? (
                <li key={link.id} className={styles.subMenu}>
                  <NavLink to={link.path} onClick={handleShowToggleMenu}>
                    {link.title}
                  </NavLink>

                  <ul className={styles.dropdownMenu}>
                    {link.subMenu.map((link) => {
                      return (
                        <li key={link.id}>
                          <NavLink to={link.path}>{link.title}</NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ) : (
                // Mega Menu Link
                <li key={link.id} className={styles.subMenu}>
                  <NavLink to={link.path} onClick={handleShowToggleMenu}>
                    {link.title}
                  </NavLink>
                  <div className={styles.megaMenu}>
                    <div className={styles.content}>
                      {link.subMenu.map((item) => {
                        return (
                          <div key={item.id} className={styles.row}>
                            <p className={styles.title}>{item.title}</p>
                            <ul className={styles.megaMenuLinks}>
                              {item.subMenu?.map((i) => {
                                return (
                                  <li key={i.id}>
                                    <NavLink
                                      to={i.path}
                                      onClick={handleShowToggleMenu}
                                    >
                                      {i.title}
                                    </NavLink>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.toggleMenu} onClick={handleShowToggleMenu}>
          {showMobileMenu ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};
