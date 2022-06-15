import { useEffect } from 'react';
import { useAuth } from '../../context/auth';

import { InvoicesPending } from '../../components/users/invoices/InvoicesPending';
import { ContactSection } from '../../components/ContactSection';

export const UserInvoicesPending = () => {
  const { currentUser, setView } = useAuth();

  useEffect(() => {
    setView('userHome');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="title-center">Deuda Actual de {currentUser.name}</h1>
      <InvoicesPending />
      <ContactSection />
    </>
  );
};
