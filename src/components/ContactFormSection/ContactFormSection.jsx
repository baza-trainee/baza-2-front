import styles from './ContactFormSection.module.scss';
import { useTranslations } from "next-intl";

import ContactForm from '../forms/ContactForm/ContactForm';

export default function ContactFormSection() {
  const t = useTranslations("Main.feedback_form");

  return(
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}> {t("title")}</h2>
        <ContactForm/>
      </div>
    </section>
  )
}