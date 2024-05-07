import styles from './ContactFormSection.module.scss';
import { useTranslations } from "next-intl";

import ContactForm from './ContactForm/ContactForm';

export default function ContactFormSection() {
  const t = useTranslations("Main.feedback_form");

  return(
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h2>{t("title")}</h2>
        <ContactForm/>
      </div>
    </section>
  )
}