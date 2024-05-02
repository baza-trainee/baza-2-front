"use client";
import CountUp from "react-countup";
import styles from "./counter.module.scss";

const data = [
  {
    id: 1,
    count: 41,
    title: "активних проєктів",
  },
  {
    id: 2,
    count: 371,
    title: "залучених учасників",
  },
  {
    id: 3,
    count: 87,
    title: "працевлаштовано",
  },
];

const CounterComponent = () => {
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
              <p className={styles.title}>{item.title}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CounterComponent;
