import React from 'react';
import { contactData } from './contactData';
import ContactAddress from './ContactAddress';
import styles from './contact.module.scss';

export const ContactSection = ({
  id = 'contact',
  title = 'Contacto',
  classes,
}) => {
  return (
    <section className={styles.section} id={id}>
      <div className={styles.content}>
        <h1 className={styles.title}> {title} </h1>
        <ContactAddress data={contactData[0]} />
        <br />
        <br />
        <hr width="300px" />
        <hr width="300px" />
        <br />
        <br />
        <ContactAddress data={contactData[1]} />
      </div>
    </section>
  );
};
