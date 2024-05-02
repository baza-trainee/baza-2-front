import styles from "./FAQ.module.scss";
import FAQItem from "./FAQItem/FAQItem";

const FAQ = () => {
  return (
    <section className={styles.faq}>
      <div className="faq-container">
        <FAQItem
          title="Які проєкти ми виконуємо?"
          description="
					Деталі на сторінці Стажування"
        />
      </div>
    </section>
  );
};

export default FAQ;
