import { useEffect } from 'react';
import { useAuth } from '../../context/auth';

import { UserUpdate } from '../../components/users/Update';
import { ContactSection } from '../../components/ContactSection';

export const UsersHome = () => {
  const { setView } = useAuth();

  useEffect(() => {
    setView('userHome');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <UserUpdate />
      <ContactSection />
    </>
  );
};
