"use client";
import CountUp from "react-countup";
import styles from "./counter.module.scss";
import { useTranslations } from "next-intl";

const data = [
  {
    id: 1,
    count: 41,
    title: "active_projects",
  },
  {
    id: 2,
    count: 371,
    title: "involved_participants",
  },
  {
    id: 3,
    count: 87,
    title: "employed",
  },
];

const CounterComponent = () => {
  const t = useTranslations("Main.counter_section");
  return (
    <section className={styles.counter}>
      <ul className={styles.list}>
        {data.map((item, index) => {
          return (
            <li key={index}>
              <h1 className={styles.item}>
                <CountUp
                  start={0}
                  end={item.count}
                  duration={2}
                  formattingFn={(value) => `${value}+`}
                />
              </h1>
              <p className={styles.title}>{t(item.title)}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CounterComponent;
