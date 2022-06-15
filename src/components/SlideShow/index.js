import { useEffect, useRef } from 'react';
import { IoArrowForward, IoArrowBack } from 'react-icons/io5';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import styles from './slider.module.scss';

export const SlideShow = ({ slides, id }) => {
  const slideshow = useRef(null);

  const autoScroll = true;
  let intervalTime = 7000;
  let slideInterval;

  const autoAdvance = () => {
    slideInterval = setInterval(nextSlide, intervalTime);
  };

  const nextSlide = () => {
    if (slideshow.current.children.length > 0) {
      const firstSlide = slideshow.current.children[0];
      slideshow.current.style.transition = `2s linear all`;
      slideshow.current.style.transform = `translateX(-100%)`;

      const transition = () => {
        slideshow.current.style.transition = `none`;
        slideshow.current.style.transform = `translateX(0)`;

        slideshow.current.appendChild(firstSlide);
        slideshow.current.removeEventListener('transitionend', transition);
      };

      slideshow.current.addEventListener('transitionend', transition);
    }
  };

  const prevSlide = () => {
    if (slideshow.current.children.length > 0) {
      const lastSlide =
        slideshow.current.children[slideshow.current.children.length - 1];

      slideshow.current.insertBefore(lastSlide, slideshow.current.firstChild);
      slideshow.current.style.transition = 'none';
      const tamañoSlide = slideshow.current.children[0].offsetWidth;
      slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;

      setTimeout(() => {
        slideshow.current.style.transition = `2s linear all`;
        slideshow.current.style.transform = `translateX(0)`;
      }, 30);
    }
  };

  useEffect(() => {
    if (autoScroll) {
      autoAdvance();
    }
    return () => {
      clearInterval(slideInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.section} id={id}>
      <div className={styles.slider} ref={slideshow}>
        {slides.map((slide, i) => {
          return (
            <div className={styles.slide} key={i}>
              <div>
                <img
                  className={styles.images}
                  src={slide.image}
                  alt={slide.alt}
                />
              </div>
              <div
                className={
                  slide.side === 'right'
                    ? `${styles.info}`
                    : `${styles.info} ${styles.left}`
                }
                side={slide.side}
              >
                <p>{slide.title}</p>
                {i > 0 && (
                  <div className={styles.socialMedia}>
                    <a
                      href="https://www.facebook.com/SaintdeVenezuela/"
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label="Facebook"
                    >
                      <FaFacebook />
                    </a>
                    <a
                      href="https://www.instagram.com/saintve/"
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label="Instagram"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="https://twitter.com/saintve"
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label="Twitter"
                    >
                      <FaTwitter />
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.buttons}>
        <IoArrowBack className={styles.arrows} onClick={prevSlide} />
        <IoArrowForward className={styles.arrows} onClick={nextSlide} />
      </div>
    </section>
  );
};
