import {
  FaBusinessTime,
  FaHome,
  FaLock,
  FaMailBulk,
  FaMoneyBill,
  FaFileInvoiceDollar,
  FaShip,
  FaSignOutAlt,
  FaSignInAlt,
  FaUser,
  FaUserEdit,
} from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';
import { FcCurrencyExchange } from 'react-icons/fc';
import { GiTakeMyMoney } from 'react-icons/gi';
import { BiAnalyse } from 'react-icons/bi';
import { BiCog } from 'react-icons/bi';
import { AiOutlineDashboard, AiTwotoneFileExclamation } from 'react-icons/ai';
import { BsCartCheck } from 'react-icons/bs';

export const routes = {
  landing: [
    {
      id: 'landing-01',
      path: '/',
      name: 'Inicio',
      icon: <FaHome />,
    },
    {
      id: 'landing-02',
      path: '/login',
      name: 'Ingresar',
      icon: <FaSignInAlt />,
    },
  ],
  login: [
    {
      id: 'login-01',
      path: '/',
      name: 'Inicio',
      icon: <FaHome />,
    },
  ],
  userHome: [
    {
      id: 'user-01',
      path: '/user',
      name: 'Home',
      icon: <FaHome />,
    },
    {
      id: 'user-02',
      path: '/user/payment',
      name: 'Pagar Recibos',
      icon: <AiOutlineDashboard />,
    },
    {
      id: 'user-03',
      path: '/user/statement',
      name: 'Estado de Cuenta',
      icon: <FaShip />,
    },
    {
      id: 'user-04',
      path: '/user/statement',
      name: 'Estado de Cuenta',
      icon: <FaShip />,
    },
    {
      id: 'user-05',
      path: '/user/update',
      name: 'Actualizar Datos',
      icon: <FaUserEdit />,
    },
    {
      id: 'user-06',
      path: '/',
      name: 'Salir',
      icon: <FaSignOutAlt />,
    },
  ],
  adminHome: [
    {
      id: 'admin-01',
      path: '/',
      name: 'Inicio',
      icon: <FaHome />,
    },
    {
      id: 'admin-02',
      path: '/admin',
      name: 'Dashboard',
      icon: <AiOutlineDashboard />,
    },
    {
      id: 'admin-03',
      path: '/admin',
      name: 'Recibos',
      icon: <FaFileInvoiceDollar />,
      subRoutes: [
        {
          id: 'admin-03-01',
          path: '/admin/invoicetoconfirm',
          name: 'Confirmar Pagos',
          icon: <GiTakeMyMoney />,
        },
        {
          id: 'admin-03-02',
          path: '/admin/payments',
          name: 'Pagos Confirmados',
          icon: <FaMoneyBill />,
        },
      ],
    },
    {
      id: 'admin-04',
      path: '/admin/exchangeRate',
      name: 'Tasas de Cambio',
      icon: <FcCurrencyExchange />,
    },
    {
      id: 'admin-05',
      path: '/',
      name: 'Salir',
      icon: <FaSignOutAlt />,
    },
  ],
  others: [
    {
      id: 'others-01',
      path: '/',
      name: 'Home',
      icon: <FaHome />,
    },
    {
      id: 'others-02',
      path: '/',
      name: 'Dashboard',
      icon: <AiOutlineDashboard />,
      subRoutes: [
        {
          id: 'others-02-01',
          path: '/dashboard',
          name: 'Dashboard',
          icon: <FaHome />,
        },
        {
          id: 'others-02-02',
          path: '/dasboard2',
          name: 'Dashboard 2',
          icon: <FaBusinessTime />,
        },
        {
          id: 'others-02-03',
          path: '/dasboard3',
          name: 'Dashboard 3',
          icon: <FaMailBulk />,
        },
      ],
    },
    {
      id: 'others-03',
      path: '/users',
      name: 'Users',
      icon: <FaUser />,
    },
    {
      id: 'others-04',
      path: '/messages',
      name: 'Messages',
      icon: <MdMessage />,
    },
    {
      id: 'others-05',
      path: '/analytics',
      name: 'Analytics',
      icon: <BiAnalyse />,
    },
    {
      id: 'others-06',
      path: '/file-manager',
      name: 'File Manager',
      icon: <AiTwotoneFileExclamation />,
      subRoutes: [
        {
          id: 'others-06-01',
          path: '/settings/profile',
          name: 'Profile ',
          icon: <FaUser />,
        },
        {
          id: 'others-06-02',
          path: '/settings/2fa',
          name: '2FA',
          icon: <FaLock />,
        },
        {
          id: 'others-06-03',
          path: '/settings/billing',
          name: 'Billing',
          icon: <FaMoneyBill />,
        },
      ],
    },
    {
      id: 'others-07',
      path: '/order',
      name: 'Order',
      icon: <BsCartCheck />,
    },
    {
      id: 'others-08',
      path: '/settings',
      name: 'Settings',
      icon: <BiCog />,
      exact: true,
      subRoutes: [
        {
          id: 'others-08-01',
          path: '/settings/profile',
          name: 'Profile ',
          icon: <FaUser />,
        },
        {
          id: 'others-08-02',
          path: '/settings/2fa',
          name: '2FA',
          icon: <FaLock />,
        },
        {
          id: 'others-08-03',
          path: '/settings/billing',
          name: 'Billing',
          icon: <FaMoneyBill />,
        },
      ],
    },
    {
      id: 'others-09',
      path: '/landing',
      name: 'Logout',
      icon: <FaSignOutAlt />,
    },
  ],
};
