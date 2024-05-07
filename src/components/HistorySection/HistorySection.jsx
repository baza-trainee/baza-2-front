import Timeline from "../Timeline/Timeline";

import styles from "./HistorySection.module.scss";

const HistorySection = () => {
  return (
    <section className={styles.history}>
      <div className={styles.container}>
        <h1 className={styles.title}>Історія проєкту</h1>
        <p className={styles.text}>
          Наш проєкт розпочався у квітні 2023 року з метою підтримки та
          професійного розвитку джунів та світчерів до сфери ІТ.
          <br /> За рік ми досягли значних успіхів:
        </p>
        <Timeline />
      </div>
    </section>
  );
};

export default HistorySection;
