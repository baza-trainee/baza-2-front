"use client";
import CountUp from "react-countup";
import styles from "./counter.module.scss";
import { useTranslations } from "next-intl";
import { createKey } from "@/src/lib/utils/createKey";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/src/api/achievements";

const CounterComponent = () => {
  const t = useTranslations("Main.counter_section");
  // Функція запиту 
  const employed = useQuery({ queryKey: ['employed'], queryFn: getData });

  const data = [
    {
      id: 1,
      count:  employed.data?.projects ? employed.data.projects: '41',
      title: "active_projects",
    },
    {
      id: 2,
      count:  employed.data?.members ? employed.data.members: '371',
      title: "involved_participants",
    },
    {
      id: 3,
      count: employed.data?.employed ? employed.data.employed : '200',
      title: "employed",
    },
  ];
  return (
    <section className={styles.counter}>
      <div className={styles.container}>
        {data.map((item) => {
          return (
            <div className={styles.item} key={createKey()}>
              <p className={styles.numbers}>
                <CountUp
                  start={0}
                  end={item.count}
                  duration={2}
                  formattingFn={(value) => `${value}+`}
                />
              </p>
              <h2 className={styles.title}>{t(item.title)}</h2>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CounterComponent;
