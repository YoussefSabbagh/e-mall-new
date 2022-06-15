import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { FaBars, FaSearch } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import SidebarMenu from './SidebarMenu';

import './sidebar.scss';
import styles from './sidebar.module.scss';
import { routes } from './dataRouteSidebar';
import { useAuth } from '../../context/auth';

export const Sidebar = ({ children }) => {
  const { view } = useAuth();

  let sidebarTitle = 'Saint E-Mall';
  let routersPage = routes.landing;

  switch (view) {
    case 'landing':
      sidebarTitle = 'Saint E-Mall';
      routersPage = routes.landing;
      break;

    case 'login':
      sidebarTitle = 'Ingresar';
      routersPage = routes.login;
      break;

    case 'userHome':
      sidebarTitle = 'Bienvenido';
      routersPage = routes.userHome;
      break;

    case 'adminHome':
      sidebarTitle = 'Adminitracion';
      routersPage = routes.adminHome;
      break;
    default:
      sidebarTitle = 'Documentation';
      break;
  }

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: { duration: 0.2 },
    },
    show: {
      width: '140px',
      padding: '5px 15px',
      transition: { duration: 0.2 },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: { duration: 0.5 },
    },
    show: {
      opacity: 1,
      width: 'auto',
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <motion.div
          animate={{
            width: isOpen
              ? 'var(--sidebar-width-open'
              : 'var(--sidebar-width-close',

            transition: {
              duration: 0.5,
              type: 'spring',
              damping: 10,
            },
          }}
          className={styles.sidebar}
        >
          <div className={styles.topSection}>
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className={styles.logo}
                >
                  {sidebarTitle}
                </motion.h1>
              )}
            </AnimatePresence>

            <div className={styles.bars}>
              <FaBars onClick={toggle} />
            </div>
          </div>

          <>
            <div className={styles.search}>
              <div>
                <FaSearch />
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.input
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={inputAnimation}
                    type="text"
                    placeholder="Search"
                  />
                )}
              </AnimatePresence>
            </div>

            <section className={styles.routes}>
              {routersPage.map((route, index) => {
                if (route.subRoutes) {
                  return (
                    <SidebarMenu
                      setIsOpen={setIsOpen}
                      route={route}
                      showAnimation={showAnimation}
                      isOpen={isOpen}
                    />
                  );
                }

                return (
                  <NavLink
                    to={route.path}
                    key={route.id}
                    className={styles.link}
                  >
                    <div>{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className={styles.link_text}
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                );
              })}
            </section>
          </>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};
