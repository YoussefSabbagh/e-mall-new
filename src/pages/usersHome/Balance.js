import { useEffect } from 'react';
import { useAuth } from '../../context/auth';

import { UserBalanceStatement } from '../../components/users/invoices/BalanceStatement';
import { ContactSection } from '../../components/ContactSection';

export const UserBalance = () => {
  const { currentUser, setView } = useAuth();

  useEffect(() => {
    setView('userHome');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h1 className="title-center">Estado de Cuenta: {currentUser.name}</h1>
      <UserBalanceStatement />
      <ContactSection />
    </>
  );
};
