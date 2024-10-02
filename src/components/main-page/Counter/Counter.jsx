"use client";
import CountUp from "react-countup";
import styles from "./counter.module.scss";
import { useTranslations } from "next-intl";
import { createKey } from "@/src/lib/utils/createKey";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/src/api/achievements";
import { useInView } from "react-intersection-observer";

const CounterComponent = () => {
  const t = useTranslations("Main.counter_section");
  // Функція запиту
  const employed = useQuery({ queryKey: ["employed"], queryFn: getData });
  const data = [
    {
      id: 1,
      count: employed.data?.projects ? employed.data.projects : "46",
      title: "active_projects",
    },
    {
      id: 2,
      count: employed.data?.members ? employed.data.members : "417",
      title: "involved_participants",
    },
    {
      id: 3,
      count: employed.data?.employed ? employed.data.employed : "110",
      title: "employed",
    },
  ];

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section className={styles.counter}>
      <div ref={ref} className={styles.container}>
        {data.map((item) => {
          return (
            <div className={styles.item} key={createKey()}>
              <span className={styles.numbers}>
                <CountUp
                  start={0}
                  end={inView ? item.count : 0}
                  duration={3}
                  formattingFn={(value) => `${value}+`}
                />
              </span>
              <h3 className={styles.title}>{t(item.title)}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CounterComponent;
