import { useEffect } from 'react';
import { useAuth } from '../../context/auth';

import { ExchangeRatesList } from '../../components/exchangeRates/index';
import { ContactSection } from '../../components/ContactSection';

export const ExchangeRates = () => {
  const { setView } = useAuth();

  useEffect(() => {
    setView('adminHome');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ExchangeRatesList />
      <ContactSection />
    </>
  );
};
