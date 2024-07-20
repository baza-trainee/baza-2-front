import styles from './Section.module.scss';

export default function Section({title, text,  children}) {
  return (
  <section className={styles.section}>
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      { children }
    </div>
  </section>
  )
}