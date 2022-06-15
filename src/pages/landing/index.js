import { useEffect } from 'react';
import { useAuth } from '../../context/auth';

import { ContactSection } from '../../components/ContactSection';
import { SlideShow } from '../../components/SlideShow';
import { SliderData } from '../../components/SlideShow/SliderData';

export const Landing = () => {
  const { setView } = useAuth();

  useEffect(() => {
    setView('landing');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SlideShow id="home" slides={SliderData} />
      <ContactSection />
    </>
  );
};
