"use client";
import CountUp from "react-countup";
import styles from "./counter.module.scss";
import { useTranslations } from "next-intl";
import { createKey } from "@/src/lib/utils/createKey";

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
      <div className={styles.container}>
        {data.map((item) => {
          return (
            <div className={styles.item} key={createKey()}>
              <h2 className={styles.numbers}>
                <CountUp
                  start={0}
                  end={item.count}
                  duration={2}
                  formattingFn={(value) => `${value}+`}
                />
              </h2>
              <p className={styles.title}>{t(item.title)}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CounterComponent;
