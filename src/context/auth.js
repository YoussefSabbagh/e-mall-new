import { useState, createContext, useContext } from 'react';
import HomeFinder from '../apis/Home';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('landing');
  const [currentUser, setCurrentUser] = useState({});
  const [invoices, setInvoices] = useState(null);
  const [invoicesAll, setInvoicesAll] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const checkAuthenticated = async () => {
    try {
      const data = await HomeFinder.home();

      if (data.success) {
        setCurrentUser((p) => data.data);
        setIsAuthenticated(true);
        if (data.data.user_role === 'AD') {
          setIsAdmin(true);
          setIsUser(false);
          setView('adminHome');
        } else {
          setIsAdmin(false);
          setIsUser(true);
          setView('userHome');
        }
      } else {
        setCurrentUser({});
        setIsAuthenticated(false);
        setIsAdmin(false);
        setIsUser(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    setUser(null);
    setIsAdmin(false);
    setIsUser(false);
  };

  const value = {
    user,
    setUser,
    view,
    setView,
    isAdmin,
    setIsAdmin,
    isUser,
    setIsUser,
    currentUser,
    setCurrentUser,
    isAuthenticated,
    invoices,
    setInvoices,
    invoicesAll,
    setInvoicesAll,
    setIsAuthenticated,
    checkAuthenticated,
    setAuth,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
