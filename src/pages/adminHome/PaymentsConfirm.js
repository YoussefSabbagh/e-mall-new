import { useEffect } from 'react';
import { useAuth } from '../../context/auth';

import { ContactSection } from '../../components/ContactSection';
import { PaymentsList } from '../../components/admin/PaymentsList';

export const PaymentsConfirm = () => {
  const { setView } = useAuth();

  useEffect(() => {
    setView('adminHome');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PaymentsList />
      <ContactSection />
    </>
  );
};
