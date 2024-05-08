import styles from "./Copyright.module.scss";

const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <p className={styles.copyrights}>
      Розробка Baza Trainee Ukraine &copy; {currentYear} Усі права захищен
    </p>
  );
};

export default Copyright;
