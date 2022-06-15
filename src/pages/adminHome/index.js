import { useEffect } from 'react';
import { useAuth } from '../../context/auth';

import { Dashboard } from '../../components/Dashboards';
import { ContactSection } from '../../components/ContactSection';

export const AdminHome = () => {
  const { setView } = useAuth();

  useEffect(() => {
    setView('adminHome');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Dashboard />
      <ContactSection />
    </>
  );
};
