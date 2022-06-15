import { useEffect } from 'react';
import { useAuth } from '../../context/auth';

import { ContactSection } from '../../components/ContactSection';
import InvoiceToConfirm from '../../components/admin/InvoicesToConfirm';

export const InvoiceAdmin = () => {
  const { setView } = useAuth();

  useEffect(() => {
    setView('adminHome');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <InvoiceToConfirm />
      <ContactSection />
    </>
  );
};
